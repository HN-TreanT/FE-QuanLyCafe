import { all, fork, put, select, takeEvery } from "redux-saga/effects";
import { notification } from "../../components/notification";
import actions from "./actions";
import stateActions from "../state/actions";
import { productServices } from "../../untils/networks/services/productService";
import { authService } from "../../untils/networks/services/authService";
import { materialService } from "../../untils/networks/services/materialService";
import { MaterialActions } from "../material/actions";
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
function* saga_GetTopSellProduct() {
  try {
    let _time: Promise<any> = yield select(
      (state: any) => state.overview.timeState
    );
    let time: any = _time;
    yield put(stateActions.action.loadingState(true));
    let _response: Promise<any> = yield productServices.GetTop5Product(time);
    let response: any = _response;
    if (response.Status) {
      yield put(actions.action.GettopSellProductSuccess(response.Data));
      yield put(stateActions.action.loadingState(false));
    } else {
      yield handleFail("load top sell product failed");
    }
  } catch (ex: any) {
    yield handleErr(ex);
  }
}

function* saga_loadData() {
  try {
    const accessToken = localStorage.getItem("token");
    const refreshToken = localStorage.getItem("refreshToken");
    let refreshModel = {
      accessToken: accessToken,
      refreshToken: refreshToken,
    };
    yield put(stateActions.action.loadingState(true));
    let _refresh: Promise<any> = yield authService.handleRefreshToken(
      refreshModel
    );
    let refresh: any = _refresh;
    if (!refresh) {
      yield put(stateActions.action.loadingState(false));
      yield handleFail("refresh token fail");
    }
    localStorage.setItem("token", refresh.AccessToken);
    localStorage.setItem("refreshToken", refresh.RefreshToken);
    let _response: Promise<any> = yield productServices.GetAllProduct();
    let response: any = _response;
    if (response.Status) {
      yield put(actions.action.loadDataSuccess(response.Data));
      yield put(stateActions.action.loadingState(false));
    } else {
      yield handleFail("load data fail");
    }
  } catch (err: any) {
    yield handleErr(err);
  }
}

function* saga_AddProduct() {
  try {
    let _infoProduct: Promise<any> = yield select(
      (state: any) => state.product.infoProduct
    );
    let infoProduct: any = _infoProduct;
    let _infoUseMaterial: Promise<any> = yield select(
      (state: any) => state.material.infoUseMaterials
    );
    let infoUseMaterial: any = _infoUseMaterial;
    let _newProduct: Promise<any> = yield productServices.CreateProduct(
      infoProduct
    );
    let newProduct: any = _newProduct;
    if (newProduct.Status) {
      let data: any[] = [];
      data = infoUseMaterial.map((info: any) => {
        return {
          ...info,
          IdProduct: newProduct.Data.IdProduct,
        };
      });
      let _res: Promise<any> = yield materialService.createManyUseMaterial(
        data
      );
      let res: any = _res;
      if (!res.Status) {
        yield handleFail("add material fail");
      }
      yield put(actions.action.loadData());
      yield put(MaterialActions.selectedMaterial([]));
    } else {
      yield handleFail("add product fail");
    }
  } catch (err: any) {
    yield handleErr(err);
  }
}

function* saga_deleteProduct() {
  let _productId: Promise<any> = yield select(
    (state: any) => state.product.productId
  );
  let productId: any = _productId;
  yield put(stateActions.action.loadingState(true));
  let _response: Promise<any> = yield productServices.DeleteProduct(productId);
  let response: any = _response;
  if (response.Status) {
    yield put(actions.action.loadData());
    yield put(stateActions.action.loadingState(false));
  } else {
    yield handleFail("delete product fail");
  }
  try {
  } catch (err: any) {
    yield handleErr(err);
  }
}

function* saga_updateProduct() {
  try {
  } catch (err: any) {
    yield handleErr(err);
  }
}
function* listen() {
  yield takeEvery(actions.types.GET_TOP_SELL_PRODUCT, saga_GetTopSellProduct);
  yield takeEvery(actions.types.LOAD_DATA, saga_loadData);
  yield takeEvery(actions.types.ADD_PRODUCT, saga_AddProduct);
  yield takeEvery(actions.types.DELETE_PRODUCT, saga_deleteProduct);
  yield takeEvery(actions.types.UPDATE_PRODUCT, saga_updateProduct);
}

export default function* mainSaga() {
  yield all([fork(listen)]);
}
