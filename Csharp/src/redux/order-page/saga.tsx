import {
  all,
  call,
  fork,
  put,
  select,
  take,
  takeEvery,
} from "redux-saga/effects";
import { notification } from "../../components/notification";
import actions from "./actions";
import stateActions from "../state/actions";
import { billServices } from "../../untils/networks/services/billService";
import { productServices } from "../../untils/networks/services/productService";
import { orderDetailServices } from "../../untils/networks/services/OrderDetailService";
import moment from "moment";
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

function* saga_Redirect() {
  //action.type.
  let _navigate: Promise<any> = yield select(
    (state: any) => state.state.navigate
  );
  let navigate: any = _navigate;
  if (navigate.navigate && navigate.path) {
    navigate.navigate(navigate.path);
  }
}
function* loadProduct() {
  try {
    let _selectedPageProduct: Promise<any> = yield select(
      (state: any) => state.orderpage.selectedPageProduct
    );
    let selectedPageProduct: any = _selectedPageProduct;
    let _selectedCategory: Promise<any> = yield select(
      (state: any) => state.orderpage.selectedCategory
    );
    let selectedCategory: any = _selectedCategory;
    let _searchValue: Promise<any> = yield select(
      (state: any) => state.orderpage.searchValue
    );
    let searchValue: any = _searchValue;
    yield put(stateActions.action.loadingState(true));
    let _response: Promise<any>;
    if (!selectedCategory || selectedCategory === "allProduct") {
      _response = yield productServices.GetAllProduct(
        selectedPageProduct,
        searchValue,
        "nameProduct",
        12
      );
    } else {
      _response = yield productServices.GetAllProductByCategory(
        selectedPageProduct ? selectedPageProduct : 1,
        12,
        selectedCategory,
        searchValue
      );
    }
    let response: any = _response;
    if (response.Status) {
      yield put(actions.action.loadProductSuccess(response));
      yield put(stateActions.action.loadingState(false));
    } else {
      yield handleFail("load data fail");
    }
  } catch (err: any) {
    yield handleErr(err);
  }
}

function* loadOrders() {
  try {
    //type search
    let _typeSearch: Promise<any> = yield select(
      (state: any) => state.orderpage.typeSearchOrder
    );
    let typeSearch: any = _typeSearch;
    //search value
    let _seacrchValue: Promise<any> = yield select(
      (state: any) => state.orderpage.searchValueOrders
    );
    let searchValue: any = _seacrchValue;
    // page selected
    let _selectedPage: Promise<any> = yield select(
      (state: any) => state.orderpage.selectedPageOrders
    );
    let selectedPage: any = _selectedPage;
    yield put(stateActions.action.loadingState(true));
    //lấy time ngày hôm nay:

    const timeEnd = moment()
      .add(5, "minutes")
      .format("ddd, DD MMM YYYY HH:mm:ss [GMT]");

    const timeStart = moment()
      .subtract(1, "day")
      .format("ddd, DD MMM YYYY HH:mm:ss [GMT]");
    ///api
    let _response: Promise<any> = yield billServices.getAllOrder(
      typeSearch,
      searchValue,
      "getOrderUnpaid",
      selectedPage ? selectedPage : 1,
      timeStart,
      timeEnd
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
      yield put(actions.action.loadOrdersSuccess(response));
      yield put(stateActions.action.loadingState(false));
    } else {
      response.Data = [];
      yield put(actions.action.loadOrdersSuccess(response));
      yield put(stateActions.action.loadingState(false));
    }
  } catch (ex: any) {
    yield handleErr(ex);
  }
}
function* loadTable() {
  try {
    let _stateTable: Promise<any> = yield select(
      (state: any) => state.orderpage.stateTable
    );
    let stateTable: any = _stateTable;
    let _selectedPage: Promise<any> = yield select(
      (state: any) => state.orderpage.selectedPageTable
    );
    let selectedPage: any = _selectedPage;
    let _searchValue: Promise<any> = yield select(
      (state: any) => state.orderpage.searchValueTable
    );
    let searchValue: any = _searchValue;
    yield put(stateActions.action.loadingState(true));
    let _response: Promise<any> = yield tableFoodService.getAllTableFood(
      selectedPage ? selectedPage : 1,
      stateTable ? stateTable : "allTable",
      searchValue ? searchValue : undefined
    );
    yield put(stateActions.action.loadingState(false));
    let response: any = _response;
    yield put(actions.action.loadTableSuccess(response));
  } catch (e: any) {
    yield handleErr(e);
  }
}
function* saga_createOrder() {
  try {
    let _response: Promise<any> = yield billServices.createOrder({ Amount: 0 });
    let response: any = _response;

    if (response.Status) {
      yield put(actions.action.setSelectedOrder(response.Data));
      yield put(actions.action.setSelectedPageOrders(1));
      yield put(actions.action.setPageOrderProductTable("allOrder"));
      yield put(actions.action.loadOrders());
    }
  } catch (err: any) {
    yield handleErr(err);
  }
}
function* saga_updateOrder() {
  try {
    let _infoUpdateOrder: Promise<any> = yield select(
      (state: any) => state.orderpage.infoUpdateOrder
    );
    let infoUpdate: any = _infoUpdateOrder;
    yield put(stateActions.action.loadingState(true));
    let _response: Promise<any> = yield billServices.updateOrder(
      infoUpdate?.IdOrder,
      infoUpdate
    );
    let response: any = _response;
    if (response?.Status) {
      yield put(actions.action.setSelectedPageOrders(1));
      yield put(actions.action.setPageOrderProductTable("allOrder"));
      yield put(actions.action.loadOrders());
      yield put(actions.action.loadTable());
      yield put(actions.action.loadSelectedOrder());
      yield put(actions.action.setInfoUpdateOrder({}));
      yield put(stateActions.action.loadingState(true));
      notification({
        message: "Cập nhật thành công",
        title: "Thông báo",
        position: "top-right",
        type: "success",
      });
    } else {
      yield handleFail(response.Message);
      yield put(actions.action.setInfoUpdateOrder({}));
    }
  } catch (e: any) {
    yield handleErr(e);
  }
}
function* saga_deleteOrder() {
  try {
    let _selectedOrder: Promise<any> = yield select(
      (state: any) => state.orderpage.selectedOrder
    );
    let selectedOrder: any = _selectedOrder;
    yield put(stateActions.action.loadingState(true));
    let _res: Promise<any> = yield billServices.deleteOrder(
      selectedOrder?.IdOrder
    );
    let res: any = _res;
    if (res?.Status) {
      yield put(actions.action.setSelectedOrder({}));
      yield put(actions.action.setSelectedPageOrders(1));
      yield put(actions.action.setPageOrderProductTable("allOrder"));
      yield put(actions.action.loadOrders());
      yield put(stateActions.action.loadingState(false));
      notification({
        message: "Xóa thành công",
        title: "Thông báo",
        position: "top-right",
        type: "success",
      });
    } else {
      yield handleFail(res?.Message);
    }
  } catch (err: any) {
    yield handleErr(err);
  }
}
function* saga_loadSelectedOrder() {
  try {
    let _selectedOrder: Promise<any> = yield select(
      (state: any) => state.orderpage.selectedOrder
    );
    let selectedOrder: any = _selectedOrder;
    // yield put(stateActions.action.loadingState(true));
    let _order: Promise<any> = yield billServices.getDetailOrder(
      selectedOrder?.IdOrder
    );
    let order: any = _order;
    if (order?.Status) {
      let _listOrderDetail: Promise<any> =
        yield orderDetailServices.handleGetOrderByIdOrder(
          selectedOrder?.IdOrder
        );
      let ListOrderDetail: any = _listOrderDetail;
      yield put(
        actions.action.setSelectedOrder({
          ...order?.Data,
          OrderDetails: ListOrderDetail?.Data ? ListOrderDetail?.Data : [],
        })
      );
      yield put(actions.action.setInfoUpdateOrder({}));
      yield put(stateActions.action.loadingState(false));
    } else {
      yield put(actions.action.setInfoUpdateOrder({}));
      //  yield handleErr(order?.Message);
    }
  } catch (err: any) {
    yield handleErr(err);
  }
}
function* saga_handleSplitOrder() {
  try {
    let _orderSplit: Promise<any> = yield select(
      (state: any) => state.orderpage.orderSplit
    );
    let orderSplit: any = _orderSplit;
    let _selectedOrder: Promise<any> = yield select(
      (state: any) => state.orderpage.selectedOrder
    );
    let selectedOrder: any = _selectedOrder;
    console.log("check order split", orderSplit);
    if (
      !orderSplit?.typeSplitOrder ||
      orderSplit?.typeSplitOrder === "createNewOrder"
    ) {
      console.log("createNewOrder");
    } else {
      let data: any[] = [];
      if (Array.isArray(orderSplit?.dataSplitOrder)) {
        data = orderSplit?.dataSplitOrder.map((item: any) => {
          return {
            OrderDetail: item?.key,
            IdProduct: item?.IdProduct,
            CountSplit: item?.CountSplit,
          };
        });
      }
      yield put(stateActions.action.loadingState(true));
      let _response: Promise<any> = yield billServices.splitOrder(
        selectedOrder?.IdOrder,
        orderSplit?.graftTable,
        data
      );
      let response: any = _response;

      if (response?.Status) {
        // yield put(actions.action.setSelectedOrder({}));
        yield put(actions.action.setOrderSplit({}));
        yield put(stateActions.action.loadingState(false));
        yield put(actions.action.loadOrders());
        yield put(actions.action.loadSelectedOrder());
        notification({
          message: "Tách bán thành công",
          title: "Thông báo",
          position: "top-right",
          type: "success",
        });
      } else {
        yield put(stateActions.action.loadingState(false));
        yield handleFail(response?.Message);
      }
    }
  } catch (err: any) {
    yield handleErr(err);
  }
}
// function* saga
function* listen() {
  yield takeEvery(actions.types.LOAD_PRODUCT, loadProduct);
  yield takeEvery(actions.types.LOAD_ORDERS, loadOrders);
  yield takeEvery(actions.types.LOAD_TABLE, loadTable);
  yield takeEvery(actions.types.CREARTE_ORDER, saga_createOrder);
  yield takeEvery(actions.types.UPDATE_ORDER, saga_updateOrder);
  yield takeEvery(actions.types.DELETE_ORDER, saga_deleteOrder);
  yield takeEvery(actions.types.LOAD_SELECTED_ORDER, saga_loadSelectedOrder);
  yield takeEvery(actions.types.HANLDE_SPLIT_ORDER, saga_handleSplitOrder);
}

export default function* mainSaga() {
  yield all([fork(listen)]);
}
