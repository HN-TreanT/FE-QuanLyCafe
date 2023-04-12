const types = {
  GET_TOP_SELL_PRODUCT: "/product/get_top-sell-product",
  GET_TOP_SELL_PRODUCT_SUCCESS: "/product/get_top_sell_product_success",
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
};
const actions = {
  types,
  action,
};
export default actions;
export const ProductActions = action;
