import { all, fork, put, takeEvery } from "redux-saga/effects";
import { notification } from "../../components/notification";
import actions, { OverviewAction } from "./actions";
import stateActions from "../state/actions";
import { authService } from "../../untils/networks/services/authService";
function* handleFail(message: any) {
  yield put(stateActions.action.loadingState(false));
  notification({
    message: " failed",
    title: "Thông báo",
    position: "top-right",
    type: "danger",
  });
}

function* handleErr(type: any, err: any) {
  yield put(stateActions.action.loadingState(false));
  notification({
    message: " failed",
    title: "Thông báo",
    position: "top-right",
    type: "danger",
  });
}

function* saga_LoadData() {}
function* listen() {
  yield takeEvery(actions.types.LOAD_DATA, saga_LoadData);
}

export default function* mainSaga() {
  yield all([fork(listen)]);
}
