import { all, fork, put, select, takeEvery } from "redux-saga/effects";
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

    const timeEnd = moment().format("ddd, DD MMM YYYY HH:mm:ss [GMT]");
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
    console.log(searchValue);
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
// function* saga
function* listen() {
  yield takeEvery(actions.types.LOAD_PRODUCT, loadProduct);
  yield takeEvery(actions.types.LOAD_ORDERS, loadOrders);
  yield takeEvery(actions.types.LOAD_TABLE, loadTable);
}

export default function* mainSaga() {
  yield all([fork(listen)]);
}
