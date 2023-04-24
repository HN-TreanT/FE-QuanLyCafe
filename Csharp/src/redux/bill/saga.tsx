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
  //type search
  let _typeSearch: Promise<any> = yield select(
    (state: any) => state.bill.typeSearch
  );
  let typeSearch: any = _typeSearch;
  console.log("check type search", typeSearch);
  //search value
  let _seacrchValue: Promise<any> = yield select(
    (state: any) => state.bill.searchValue
  );
  let searchValue: any = _seacrchValue;
  // state bill
  let _selectedStateBill: Promise<any> = yield select(
    (state: any) => state.bill.selectedStateBill
  );
  let selectedStateBill: any = _selectedStateBill;
  // page selected
  let _selectedPage: Promise<any> = yield select(
    (state: any) => state.bill.selectedPage
  );
  let selectedPage: any = _selectedPage;

  yield put(stateActions.action.loadingState(true));
  ///api
  let _response: Promise<any> = yield billServices.getAllOrder(
    typeSearch,
    searchValue,
    selectedStateBill,
    selectedPage
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
      response.Data = data;
    });
    yield all(promises);
    yield put(actions.action.loadDataSuccess(response));
    yield put(stateActions.action.loadingState(false));
  } else {
    yield handleFail("load data fail");
  }
  try {
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
