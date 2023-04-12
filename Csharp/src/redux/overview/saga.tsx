import { all, fork, put, select, takeEvery } from "redux-saga/effects";
import { notification } from "../../components/notification";
import actions from "./actions";
import stateActions from "../state/actions";
import { overviewServices } from "../../untils/networks/services/OrderDetailService";

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

function* saga_LoadData() {
  try {
    let _time: Promise<any> = yield select(
      (state: any) => state.overview.timeState
    );
    let time: any = _time;
    yield put(stateActions.action.loadingState(true));
    let _response: Promise<any> = yield overviewServices.handleGetOverview(
      time
    );
    let response: any = _response;
    if (response.Status) {
      yield put(actions.action.loadDataSuccess(response.Data));
      yield put(stateActions.action.loadingState(false));
    } else {
      yield handleFail("Load data fail");
    }
  } catch (err: any) {
    yield handleErr(err);
  }
}
function* listen() {
  yield takeEvery(actions.types.LOAD_DATA, saga_LoadData);
}

export default function* mainSaga() {
  yield all([fork(listen)]);
}
