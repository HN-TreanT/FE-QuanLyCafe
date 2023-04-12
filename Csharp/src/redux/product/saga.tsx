import { all, fork, put, select, takeEvery } from "redux-saga/effects";
import { notification } from "../../components/notification";
import actions from "./actions";
import stateActions from "../state/actions";
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
function* saga_GetTopSellProduct() {
  try {
    let _time: Promise<any> = yield select(
      (state: any) => state.overview.timeState
    );
    let time: any = _time;
    yield put(stateActions.action.loadingState(true));
    let _response: Promise<any> = yield productServices.GetTop5Product(time);
    let response: any = _response;
    if (response.Status) {
      yield put(actions.action.GettopSellProductSuccess(response.Data));
      yield put(stateActions.action.loadingState(false));
    } else {
      yield handleFail("load top sell product failed");
    }
  } catch (ex: any) {
    yield handleErr(ex);
  }
}

function* listen() {
  yield takeEvery(actions.types.GET_TOP_SELL_PRODUCT, saga_GetTopSellProduct);
}

export default function* mainSaga() {
  yield all([fork(listen)]);
}
