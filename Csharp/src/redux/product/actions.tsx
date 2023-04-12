const types = {
  TOP_SELL_PRODUCT: "/product/top-sell-product",
};

const action = {
  topSellProduct: (products: any) => {
    return {
      type: types.TOP_SELL_PRODUCT,
      payload: { products },
    };
  },
};
const actions = {
  types,
  action,
};
export default actions;
export const OverviewAction = action;
