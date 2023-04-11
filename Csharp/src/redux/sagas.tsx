import { all } from "redux-saga/effects";

import authSaga from "./auth/saga";
import stateSaga from "./state/saga";
import overviewSaga from "./overview/saga";

export default function* rootSaga() {
  yield all([authSaga(), stateSaga(), overviewSaga()]);
}
