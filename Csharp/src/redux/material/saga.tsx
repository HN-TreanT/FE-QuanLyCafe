import { all, fork, put, select, takeEvery } from "redux-saga/effects";
import { notification } from "../../components/notification";
import actions from "./actions";
import stateActions from "../state/actions";
import { materialService } from "../../untils/networks/services/materialService";
import { authService } from "../../untils/networks/services/authService";

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
    let _response: Promise<any> = yield materialService.getAllMaterial();
    let response: any = _response;
    if (response.Status) {
      yield put(actions.action.loadDataSuccess(response.Data));
      yield put(stateActions.action.loadingState(false));
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
