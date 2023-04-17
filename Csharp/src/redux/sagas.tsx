import { all } from "redux-saga/effects";

import authSaga from "./auth/saga";
import stateSaga from "./state/saga";
import overviewSaga from "./overview/saga";
import productSaga from "./product/saga";
import promotionSaga from "./promotion/saga";
import billSaga from "./bill/saga";
import orderDetailSaga from "./orderDetail/saga";
import materialSaga from "./material/saga";
import categorySaga from "./category/saga";
export default function* rootSaga() {
  yield all([
    authSaga(),
    stateSaga(),
    overviewSaga(),
    productSaga(),
    promotionSaga(),
    billSaga(),
    orderDetailSaga(),
    materialSaga(),
    categorySaga(),
  ]);
}
