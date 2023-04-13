import { all, fork, put, select, takeEvery } from "redux-saga/effects";
import { notification } from "../../components/notification";
import actions from "./actions";
import stateActions from "../state/actions";
import { billServices } from "../../untils/networks/services/billService";
import { orderDetailServices } from "../../untils/networks/services/OrderDetailService";

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
    let _selectedStatebill: Promise<any> = yield select(
      (state: any) => state.bill.selectedStateBill
    );
    let selectedStatebill: any = _selectedStatebill;
    yield put(stateActions.action.loadingState(true));
    let _response: Promise<any> = yield billServices.getOrder(
      selectedStatebill
    );
    let response: any = _response;
    if (response.Status) {
      const data: any[] = [];
      const promises: Promise<any>[] = response.Data.map(async (res: any) => {
        let _orderDetails: Promise<any> =
          orderDetailServices.handleGetOrderByIdOrder(res.IdOrder);
        let orderDetails: any = await _orderDetails;
        let payments = orderDetails.Data.reduce(function (
          total: Number,
          currentValue: any
        ) {
          return total + currentValue.Price;
        },
        0);
        data.push({ ...res, payments: payments });
      });
      yield all(promises);
      yield put(stateActions.action.loadingState(false));
      yield put(actions.action.loadDataSuccess(data));
    } else {
      yield handleFail("Load bill info fail");
    }
  } catch (ex: any) {
    yield handleErr(ex);
  }
}
function* listen() {
  yield takeEvery(actions.types.LOAD_DATA, saga_loadData);
}

export default function* mainSaga() {
  yield all([fork(listen)]);
}
