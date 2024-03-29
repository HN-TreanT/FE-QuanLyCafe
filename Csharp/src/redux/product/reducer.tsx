import actions from "./actions";
const initState = {
  productsTopSell: [],
  products: [],
  Id: "",
  selectedPage: 1,
  searchValue: "",
  typeSearch: "",
};
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
    case actions.types.LOAD_DATA:
      return {
        ...state,
      };
    case actions.types.LOAD_DATA_SUCCESS:
      return {
        ...state,
        ...{ products: action.payload.products },
      };
    case actions.types.ADD_PRODUCT:
      return {
        ...state,
      };
    case actions.types.SET_INFO_PRODUCT:
      return {
        ...state,
        ...{
          infoProduct: action.payload.infoProduct,
        },
      };
    case actions.types.DELETE_PRODUCT:
      return {
        ...state,
        ...{
          productId: action.payload.productId,
        },
      };
    case actions.types.UPDATE_PRODUCT:
      return {
        ...state,
      };
    case actions.types.SELECTD_PRODUCT_ID:
      return {
        ...state,
        ...{
          Id_product: action.payload.Id,
        },
      };
    case actions.types.SELECTED_PAGE:
      return {
        ...state,
        ...{
          selectedPage: action.payload.data,
        },
      };
    case actions.types.SEARCH_VALUE:
      return {
        ...state,
        ...{
          searchValue: action.payload.data,
        },
      };
    case actions.types.TYPE_SEARCH:
      return {
        ...state,
        ...{
          typeSearch: action.payload.data,
        },
      };
    default:
      return state;
  }
};

export default ProductReducer;
