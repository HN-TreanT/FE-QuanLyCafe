import { all, fork, put, select, take, takeEvery } from "redux-saga/effects";
import { notification } from "../../components/notification";
import actions from "./actions";
import stateActions from "../state/actions";
import { importGoodService } from "../../untils/networks/services/importGoodsService";
import { materialService } from "../../untils/networks/services/materialService";
import { RouterLinks } from "../../const";

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
    let _searchValue: Promise<any> = yield select(
      (state: any) => state.importgoods.searchValue
    );
    let searchValue: any = _searchValue;
    yield put(stateActions.action.loadingState(true));
    let _response: Promise<any> = yield importGoodService.getAllImportGoods(
      selectedPage,
      searchValue?.timeStart ? searchValue.timeStart : "",
      searchValue?.timeEnd ? searchValue.timeEnd : ""
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
    console.log("check time", selectedTime);
    yield put(stateActions.action.loadingState(true));
    if (Array.isArray(selectedTime)) {
      let _response: Promise<any> = yield materialService.getHistoryWarehouse(
        selectedPage,
        selectedTime[0],
        selectedTime[1]
      );
      let response: any = _response;
      yield put(actions.action.loadHistoryWarehouseSuccess(response));
      yield put(stateActions.action.loadingState(false));
    } else {
      let _response: Promise<any> = yield materialService.getHistoryWarehouse(
        selectedPage,
        undefined,
        undefined
      );
      let response: any = _response;
      yield put(actions.action.loadHistoryWarehouseSuccess(response));
      yield put(stateActions.action.loadingState(false));
    }
  } catch (err: any) {
    yield handleErr(err);
    yield put(stateActions.action.loadingState(false));
  }
}

function* saga_createImportGoods() {
  try {
    let _selectedMaterials: Promise<any> = yield select(
      (state: any) => state.importgoods.materialSelected
    );
    let selectedMaterials: any = _selectedMaterials;
    let _infoProvider: Promise<any> = yield select(
      (state: any) => state.importgoods.infoProvider
    );
    let infoProvider: any = _infoProvider;
    if (Array.isArray(selectedMaterials)) {
      let data = selectedMaterials.map((item: any) => {
        return {
          IdMaterial: item?.IdMaterial ? item.IdMaterial : "",
          NameMaterial: item?.NameMaterial ? item.NameMaterial : "",
          Amount: item?.Amount ? item.Amount : 0,
          Price: item?.Price && item.Amount ? item.Price * item.Amount : 0,
          NameProvider: infoProvider?.NameProvider
            ? infoProvider.NameProvider
            : "không có",
          PhoneProvider: infoProvider?.PhoneProvider
            ? infoProvider.PhoneProvider.toString()
            : "",
        };
      });
      yield put(stateActions.action.loadingState(true));
      let _response: Promise<any> =
        yield importGoodService.createListImportGoods(data);
      let resposne: any = _response;
      if (resposne.Status) {
        yield put(actions.action.loadData());
        yield put(stateActions.action.loadingState(false));
        notification({
          message: "create success",
          title: "Thông báo",
          position: "top-right",
          type: "success",
        });
      } else {
        yield handleFail(resposne.Message);
      }
    }
    yield put(actions.action.setMaterialSelectedImports([]));
  } catch (err: any) {
    yield handleErr(err);
  }
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

function* saga_getImportGoodsById() {
  try {
    yield put(stateActions.action.loadingState(true));
    let _searchValue: Promise<any> = yield select(
      (state: any) => state.importgoods.searchValue
    );
    let searchValue: any = _searchValue;
    let _response: Promise<any> = yield importGoodService.getDetailImportGoods(
      searchValue?.valueId
    );
    let response: any = _response;
    if (response.Status) {
      response.Data = [response.Data];
      yield put(stateActions.action.loadingState(false));
      yield put(actions.action.loadDataSuccess(response));
    } else {
      yield put(stateActions.action.loadingState(false));
      yield put(actions.action.loadDataSuccess([]));
    }
    yield put(stateActions.action.loadingState(false));
  } catch (err: any) {
    yield put(stateActions.action.loadingState(false));
  }
}
function* handleCreateImportGoods() {
  yield saga_createImportGoods();
  yield saga_Redirect();
}

function* listen() {
  yield takeEvery(actions.types.LOAD_DATA, saga_loadData);
  yield takeEvery(
    actions.types.LOAD_HISTORY_WAREHOUSE,
    saga_LoadHistoryWarehouse
  );
  // yield takeEvery(actions.types.CREATE_IMPORT_GOODS, saga_createImportGoods);
  yield takeEvery(actions.types.CREATE_IMPORT_GOODS, handleCreateImportGoods);
  yield takeEvery(
    actions.types.GET_IMPORTSGOODS_BY_ID,
    saga_getImportGoodsById
  );
}

export default function* mainSaga() {
  yield all([fork(listen)]);
}
