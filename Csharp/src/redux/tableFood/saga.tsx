import { all, fork, put, select, takeEvery } from "redux-saga/effects";
import { notification } from "../../components/notification";
import actions from "./actions";
import stateActions from "../state/actions";
import { tableFoodService } from "../../untils/networks/services/tableFoodService";

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
    let _page: Promise<any> = yield select(
      (state: any) => state.tablefood.page
    );
    let page: any = _page;
    yield put(stateActions.action.loadingState(true));
    let _reponse: Promise<any> = yield tableFoodService.getAllTableFood(
      page,
      "allTable",
      null
    );
    let response: any = _reponse;
    if (response.Status) {
      yield put(actions.action.loadDataSuccess(response));
      yield put(stateActions.action.loadingState(false));
    } else {
      handleFail("Not data fail");
      yield put(stateActions.action.loadingState(false));
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
