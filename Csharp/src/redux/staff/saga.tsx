import { all, fork, put, select, takeEvery } from "redux-saga/effects";
import { notification } from "../../components/notification";
import actions from "./actions";
import stateActions from "../state/actions";
import { staffService } from "../../untils/networks/services/staffService";
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

function* saga_loadData() {
  try {
    let _selectedPage: Promise<any> = yield select(
      (state: any) => state.staff.selectedPage
    );
    let selectedPage: any = _selectedPage;
    let _searchValue: Promise<any> = yield select(
      (state: any) => state.staff.searchNameValue
    );
    let searchValue: any = _searchValue;

    console.log("check page ", selectedPage);
    console.log("check search", searchValue);

    yield put(stateActions.action.loadingState(true));
    let _response: Promise<any> = yield staffService.getAllStaff(
      selectedPage,
      searchValue
    );
    let response: any = _response;
    if (response.Status) {
      yield put(actions.action.loadDataSuccess(response));
      yield put(stateActions.action.loadingState(false));
    } else {
      yield handleFail("get staff error");
    }
  } catch (err: any) {
    yield handleErr(err);
  }
}

function* saga_createStaff() {
  try {
    let _infoStaffCreate: Promise<any> = yield select(
      (state: any) => state.staff.infoStaffCreate
    );
    let infoStaffCreate: any = _infoStaffCreate;
    yield put(stateActions.action.loadingState(true));
    let _response: Promise<any> = yield staffService.createStaff(
      infoStaffCreate
    );
    let response: any = _response;
    if (response.Status) {
      yield put(actions.action.loadData());
      yield put(stateActions.action.loadingState(false));
      yield put(actions.action.setInfoStaffCreate({}));
      notification({
        message: "Tạo nhân viên thành công",
        title: "Thông báo",
        position: "top-right",
        type: "success",
      });
      yield saga_Redirect();
    } else {
      yield handleFail(response?.Message);
    }
  } catch (err: any) {
    yield handleErr(err);
  }
}
function* saga_updateStaff() {
  try {
    let _detailStaff: Promise<any> = yield select(
      (state: any) => state.staff.detailStaff
    );
    let detailStaff: any = _detailStaff;
    let _updateInfoStaff: Promise<any> = yield select(
      (state: any) => state.staff.infoStaffCreate
    );
    let updateInfoStaff: any = _updateInfoStaff;
    yield put(stateActions.action.loadingState(true));
    let _response: Promise<any> = yield staffService.updateStaff(
      detailStaff.IdStaff,
      updateInfoStaff
    );
    let reponse: any = _response;
    if (reponse.Data) {
      yield put(stateActions.action.loadingState(false));
      yield put(actions.action.loadData());
      notification({
        message: "Sửa đổi thành công",
        title: "Thông báo",
        position: "top-right",
        type: "success",
      });
    } else {
      handleFail("update staff fail");
    }
  } catch (err: any) {
    yield handleErr(err);
  }
}

function* listen() {
  yield takeEvery(actions.types.LOAD_DATA, saga_loadData);
  yield takeEvery(actions.types.CREATE_STAFF, saga_createStaff);
  yield takeEvery(actions.types.UPDATE_STAFF, saga_updateStaff);
}

export default function* mainSaga() {
  yield all([fork(listen)]);
}
