import { all, call, fork, put, select, takeEvery } from "redux-saga/effects";
import actions from "./actions";
import stateActions from "../state/actions";
import { authService } from "../../untils/networks/services/authService";
import { notification } from "../../components/notification";

// eslint-disable-next-line require-yield
function* saga_Login() {
  try {
    let _loginInfo: Promise<any> = yield select(
      (state: any) => state.auth.login_info
    );
    let loginInfo: any = _loginInfo;
    yield put(stateActions.action.loadingState(true));
    let _response: Promise<any> = yield authService.handleLoginApi(loginInfo);
    let response: any = _response;
    if (response.status) {
      yield put(actions.action.userInfo(response.data.user));
      yield put(actions.action.updateLoginInfo({}));
      yield put(stateActions.action.loadingState(false));
      yield put(stateActions.action.loginState(true));
      notification({
        message: "Login success",
        title: "Thông báo",
        position: "top-right",
        type: "success",
      });
    } else {
      notification({
        message: "Login failed",
        title: "Thông báo",
        position: "top-right",
        type: "danger",
      });
      yield put(stateActions.action.loadingState(false));
      yield put(stateActions.action.loginState(false));
    }
  } catch (err: any) {
    yield put(stateActions.action.loadingState(false));
    notification({
      message: "Login failed",
      title: "Thông báo",
      position: "top-right",
      type: "danger",
    });
    console.log(err);
  }
}
function* listen() {
  yield takeEvery(actions.types.LOGIN, saga_Login);
}
export default function* mainSaga() {
  yield all([fork(listen)]);
}
