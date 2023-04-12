import actions from "./actions";
const initState = {};
const ProductReducer = (state: any = initState, action: any) => {
  switch (action.type) {
    case actions.types.GET_TOP_SELL_PRODUCT:
      return {
        ...state,
      };
    case actions.types.GET_TOP_SELL_PRODUCT_SUCCESS:
      return {
        ...state,
        ...{ productsTopSell: action.payload.products },
      };
    default:
      return state;
  }
};

export default ProductReducer;
