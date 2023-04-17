import { all, fork, put, select, takeEvery } from "redux-saga/effects";
import { notification } from "../../components/notification";
import actions, { BillActions } from "./actions";
import stateActions from "../state/actions";
import { billServices } from "../../untils/networks/services/billService";
import { orderDetailServices } from "../../untils/networks/services/OrderDetailService";
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
    let _selectedStatebill: Promise<any> = yield select(
      (state: any) => state.bill.selectedStateBill
    );
    let selectedStatebill: any = _selectedStatebill;
    //refresh token

    const accessToken = localStorage.getItem("token");
    const refreshToken = localStorage.getItem("refreshToken");
    let refreshModel = {
      accessToken: accessToken,
      refreshToken: refreshToken,
    };
    let _refresh: Promise<any> = yield authService.handleRefreshToken(
      refreshModel
    );
    let refresh: any = _refresh;
    localStorage.setItem("token", refresh.AccessToken);
    localStorage.setItem("refreshToken", refresh.RefreshToken);
    ///////
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
        let payments = orderDetails.Data?.reduce(function (
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

function* saga_Deletebill() {
  try {
    let _selectedRowKeys: Promise<any> = yield select(
      (state: any) => state.bill.selectedRowKeys
    );
    let selectedRowKeys: any = _selectedRowKeys;
    console.log("Check selectedRowKey-->", selectedRowKeys);
    //refresh token
    const accessToken = localStorage.getItem("token");
    const refreshToken = localStorage.getItem("refreshToken");
    let refreshModel = {
      accessToken: accessToken,
      refreshToken: refreshToken,
    };
    let _refresh: Promise<any> = yield authService.handleRefreshToken(
      refreshModel
    );
    let refresh: any = _refresh;
    localStorage.setItem("token", refresh.AccessToken);
    localStorage.setItem("refreshToken", refresh.RefreshToken);
    ///////
    yield put(stateActions.action.loadingState(true));
    for (var Id of selectedRowKeys) {
      let _response: Promise<any> = yield billServices.deleteOrder(Id);
    }
    yield put(actions.action.loadData());
    yield put(stateActions.action.loadingState(false));
  } catch (err: any) {
    yield handleErr(err);
  }
}
function* listen() {
  yield takeEvery(actions.types.LOAD_DATA, saga_loadData);
  yield takeEvery(actions.types.DELETE_BILL, saga_Deletebill);
}

export default function* mainSaga() {
  yield all([fork(listen)]);
}
