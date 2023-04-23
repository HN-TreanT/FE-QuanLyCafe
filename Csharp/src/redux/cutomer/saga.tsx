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
import { customerServices } from "../../untils/networks/services/customerServices";

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
    let _selectedPage: Promise<any> = yield select(
      (state: any) => state.customer.selectedPage
    );
    let selectedPage: any = _selectedPage;
    let _seacrchValue: Promise<any> = yield select(
      (state: any) => state.customer.searchValue
    );
    let searchValue: any = _seacrchValue;
    console.log("check search value ", searchValue);
    let _response: Promise<any> = yield customerServices.getAllCustomer(
      selectedPage,
      searchValue
    );
    let response: any = _response;
    if (response.Status) {
      yield put(stateActions.action.loadingState(false));
      yield put(actions.action.loadDataSuccess(response));
    } else {
      yield handleFail("load data fail");
    }
  } catch (err: any) {
    yield handleErr(err);
  }
}

function* listen() {
  yield takeEvery(actions.types.LOAD_DATA, saga_loadData);
}

export default function* mainSaga() {
  yield all([fork(listen)]);
}
