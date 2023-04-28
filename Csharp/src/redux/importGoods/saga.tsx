import { all, fork, put, select, takeEvery } from "redux-saga/effects";
import { notification } from "../../components/notification";
import actions from "./actions";
import stateActions from "../state/actions";
import { importGoodService } from "../../untils/networks/services/importGoodsService";
import { materialService } from "../../untils/networks/services/materialService";

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
    let _seletedPage: Promise<any> = yield select(
      (state: any) => state.importgoods.page
    );
    let selectedPage: any = _seletedPage;
    yield put(stateActions.action.loadingState(true));
    let _response: Promise<any> = yield importGoodService.getAllImportGoods(
      selectedPage
    );
    let response: any = _response;
    if (response.Status) {
      yield put(actions.action.loadDataSuccess(response));
    }
    yield put(stateActions.action.loadingState(false));
  } catch (err: any) {
    yield handleErr(err);
  }
}
function* saga_LoadHistoryWarehouse() {
  try {
    let _selectedTime: Promise<any> = yield select(
      (state: any) => state.importgoods.selectedTimeHistory
    );
    let selectedTime: any = _selectedTime;
    let _seletedPage: Promise<any> = yield select(
      (state: any) => state.importgoods.selectedPageHistory
    );
    let selectedPage: any = _seletedPage;
    yield put(stateActions.action.loadingState(true));
    let _response: Promise<any> = yield materialService.getHistoryWarehouse(
      selectedPage,
      selectedTime[0],
      selectedTime[1]
    );
    let response: any = _response;
    yield put(actions.action.loadHistoryWarehouseSuccess(response));
    yield put(stateActions.action.loadingState(false));
  } catch (err: any) {
    yield handleErr(err);
    yield put(stateActions.action.loadingState(false));
  }
}
function* listen() {
  yield takeEvery(actions.types.LOAD_DATA, saga_loadData);
  yield takeEvery(
    actions.types.LOAD_HISTORY_WAREHOUSE,
    saga_LoadHistoryWarehouse
  );
}

export default function* mainSaga() {
  yield all([fork(listen)]);
}
