import {
  all,
  fork,
  put,
  select,
  takeEvery,
  takeLatest,
} from "redux-saga/effects";
import { notification } from "../../components/notification";
import actions from "./actions";
import stateActions from "../state/actions";
import { categoryService } from "../../untils/networks/services/categoryService";

import { RouterLinks } from "../../const";
import { push } from "react-router-redux";
import { productServices } from "../../untils/networks/services/productService";
function* handleFail(message: any) {
  yield put(stateActions.action.loadingState(false));
  notification({
    message: message,
    title: "Thông báo",
    position: "top-right",
    type: "danger",
  });
}

function* handleErr(err: any) {
  yield put(stateActions.action.loadingState(false));
  notification({
    message: err.message,
    title: "Thông báo",
    position: "top-right",
    type: "danger",
  });
}
function* saga_loadData() {
  try {
    yield put(stateActions.action.loadingState(true));
    let _res: Promise<any> = yield categoryService.getAllCategories();
    let res: any = _res;
    if (res.Status) {
      yield put(actions.action.loadDataSuccess(res.Data));
      yield put(stateActions.action.loadingState(false));
    } else {
      yield handleFail("load category fail");
    }
  } catch (err: any) {
    yield handleErr(err);
  }
}

function* saga_loadCategoryDetail() {
  try {
    let _selectedRow: Promise<any> = yield select(
      (state: any) => state.category.selectedRow
    );
    let selectedRow: any = _selectedRow;
    yield put(stateActions.action.loadingState(true));
    let _response: Promise<any> = yield categoryService.getCateroryById(
      selectedRow
    );
    let response: any = _response;
    if (response.Status) {
      yield put(actions.action.categorySelected(response.Data));
      yield put(stateActions.action.loadingState(false));
      yield put(push(RouterLinks.DETAIL_CATEGORY));
    } else {
      yield handleFail(response.Message);
    }
  } catch (err: any) {
    yield handleErr(err);
  }
}
function* saga_Redirect() {
  //action.type.
  let _navigate: Promise<any> = yield select(
    (state: any) => state.state.navigate
  );
  let navigate: any = _navigate;
  if (navigate.navigate && navigate.path) {
    navigate.navigate(navigate.path);
  }
}

function* saga_RedirectAction() {
  yield saga_loadCategoryDetail();
  yield saga_Redirect();
}
function* listen() {
  yield takeEvery(actions.types.LOAD_DATA, saga_loadData);
  yield takeEvery(actions.types.LOAD_CATEGORY_DETAIL, saga_loadCategoryDetail);
  yield takeLatest(stateActions.types.REDIRECT_ACTION, saga_RedirectAction);
}

export default function* mainSaga() {
  yield all([fork(listen)]);
}
