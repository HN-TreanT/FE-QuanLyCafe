import { all, fork, select } from "redux-saga/effects";
function* listen() {}

export default function* mainSaga() {
  yield all([fork(listen)]);
}
