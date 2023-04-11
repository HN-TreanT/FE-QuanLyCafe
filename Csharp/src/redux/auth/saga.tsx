import { all, call, fork, put, select, takeEvery } from "redux-saga/effects";
import actions, { AuthActions } from "./actions";
import stateActions from "../state/actions";
import { authService } from "../../untils/networks/services/authService";
import { notification } from "../../components/notification";

function* saga_Login() {
  try {
    let _loginInfo: Promise<any> = yield select(
      (state: any) => state.auth.login_info
    );
    let loginInfo: any = _loginInfo;
    yield put(stateActions.action.loadingState(true));
    let _response: Promise<any> = yield authService.handleLoginApi(loginInfo);
    let response: any = _response;

    if (response.StatusCode === 1) {
      localStorage.setItem("token", response.Token);
      yield put(actions.action.userInfo(response));
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
function* sage_logout() {
  try {
    let _userInfo: Promise<any> = yield select(
      (state: any) => state.auth.user_info
    );
    let userInfo: any = _userInfo;
    // const token = localStorage.getItem("token");
    // console.log(token);
    let refreshModel = {
      accessToken: userInfo.Token,
      refreshToken: userInfo.RefreshToken,
    };
    let _refresh: Promise<any> = yield authService.handleRefreshToken(
      refreshModel
    );
    let refresh: any = _refresh;
    localStorage.setItem("token", refresh.AccessToken);
    yield put(stateActions.action.loadingState(true));
    let _response: Promise<any> = yield authService.handleRevoke();
    let response: any = _response;
    console.log(response);
    if (response) {
      yield put(stateActions.action.loadingState(false));
      yield put(actions.action.userInfo({}));
      yield put(stateActions.action.loginState(false));
      notification({
        message: "logout success",
        title: "Thông báo",
        position: "top-right",
        type: "success",
      });
      //  localStorage.clear();
    }
  } catch (err: any) {
    yield put(stateActions.action.loadingState(false));
    notification({
      message: "Logout failed",
      title: "Thông báo",
      position: "top-right",
      type: "danger",
    });
    console.log(err);
  }
}
function* listen() {
  yield takeEvery(actions.types.LOGIN, saga_Login);
  yield takeEvery(actions.types.LOGOUT, sage_logout);
}
export default function* mainSaga() {
  yield all([fork(listen)]);
}
