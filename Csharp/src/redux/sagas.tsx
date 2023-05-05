import { all } from "redux-saga/effects";

import authSaga from "./auth/saga";
import stateSaga from "./state/saga";
import overviewSaga from "./overview/saga";
import productSaga from "./product/saga";
import billSaga from "./bill/saga";
import orderDetailSaga from "./orderDetail/saga";
import materialSaga from "./material/saga";
import categorySaga from "./category/saga";
import staffSaga from "./staff/saga";
import workShiftSaga from "./workshift/saga";
import customerSaga from "./cutomer/saga";
import tableFoodSaga from "./tableFood/saga";
import importGoodSaga from "./importGoods/saga";
export default function* rootSaga() {
  yield all([
    authSaga(),
    stateSaga(),
    overviewSaga(),
    productSaga(),
    billSaga(),
    orderDetailSaga(),
    materialSaga(),
    categorySaga(),
    staffSaga(),
    workShiftSaga(),
    customerSaga(),
    tableFoodSaga(),
    importGoodSaga(),
  ]);
}
