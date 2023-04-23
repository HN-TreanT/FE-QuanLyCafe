import { all, fork, put, select, takeEvery } from "redux-saga/effects";
import { notification } from "../../components/notification";
import actions from "./actions";
import stateActions from "../state/actions";
import { authService } from "../../untils/networks/services/authService";
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

function* saga_loadData() {
  try {
    let _selectedStaffState: Promise<any> = yield select(
      (state: any) => state.staff.selectedStateStaff
    );
    let selectedStaffState: any = _selectedStaffState;
    if (selectedStaffState === "allStaff") {
      yield put(stateActions.action.loadingState(true));
      let _response: Promise<any> = yield staffService.getAllStaff();
      let response: any = _response;
      if (response.Status) {
        yield put(actions.action.loadDataSuccess(response.Data));
        yield put(stateActions.action.loadingState(false));
      } else {
        yield handleFail("get staff error");
      }
    }
    if (selectedStaffState === "staffWorking") {
    }
    //yield put(actions.action.loadData());
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
    } else {
      yield handleFail("create staff fail");
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
        message: "Update success",
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
