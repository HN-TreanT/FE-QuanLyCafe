const types = {
  GET_TOP_SELL_PRODUCT: "/product/get_top-sell-product",
  GET_TOP_SELL_PRODUCT_SUCCESS: "/product/get_top_sell_product_success",
  LOAD_DATA: "/product/load-data",
  LOAD_DATA_SUCCESS: "/product/load-data-sucess",
  ADD_PRODUCT: "/product/add-product",
  SET_INFO_PRODUCT: "/product/set-info-product",
  DELETE_PRODUCT: "/product/delete-product",
};

const action = {
  GetTopSellProduct: () => {
    return {
      type: types.GET_TOP_SELL_PRODUCT,
    };
  },
  GettopSellProductSuccess: (products: any) => {
    return {
      type: types.GET_TOP_SELL_PRODUCT_SUCCESS,
      payload: { products },
    };
  },
  loadData: () => {
    return {
      type: types.LOAD_DATA,
    };
  },
  loadDataSuccess: (products: any) => {
    return {
      type: types.LOAD_DATA_SUCCESS,
      payload: { products },
    };
  },
  addProduct: () => {
    return {
      type: types.ADD_PRODUCT,
    };
  },
  setInfoProduct: (infoProduct: any) => {
    return {
      type: types.SET_INFO_PRODUCT,
      payload: { infoProduct },
    };
  },
  deleteProduct: (productId: any) => {
    return {
      type: types.DELETE_PRODUCT,
      payload: { productId },
    };
  },
};
const actions = {
  types,
  action,
};
export default actions;
export const ProductActions = action;