import { all, fork, put, select, takeEvery } from "redux-saga/effects";
import { notification } from "../../components/notification";
import actions from "./actions";
import stateActions from "../state/actions";
import { promotionServices } from "../../untils/networks/services/promotionService";

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

function* saga_setPromotionExpired() {
  try {
    yield put(stateActions.action.loadingState(true));
    let _response: Promise<any> = yield promotionServices.GetPromotionExpired();
    let response: any = _response;
    if (response.Status) {
      yield put(actions.action.SetPromotionExpiredSuccess(response.Data));
      yield put(stateActions.action.loadingState(false));
    } else {
      yield handleFail(response.Message);
    }
  } catch (ex: any) {
    yield handleErr(ex);
  }
}

function* listen() {
  yield takeEvery(
    actions.types.SET_PROMOTION_EXPIRED,
    saga_setPromotionExpired
  );
}

export default function* mainSaga() {
  yield all([fork(listen)]);
}
