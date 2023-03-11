import { all, fork } from "redux-saga/effects";

function* listen() {}

export default function* mainSaga() {
  yield all([fork(listen)]);
}
