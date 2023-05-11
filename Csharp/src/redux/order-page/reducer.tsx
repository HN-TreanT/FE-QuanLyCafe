import actions from "./actions";

const initAuth = {
  products: [],
  selectedPageProduct: 1,
  selectedCategory: "",
  searchValue: "",
  searchValueOrders: "",
  typeSearchOrder: "",
  selectedPageOrders: 1,
  tables: [],
  stateTable: "",
  selectedPageTable: "",
  searchValueTable: undefined,
};
const OrderPageReducer = (state: any = initAuth, action: any) => {
  switch (action.type) {
    case actions.types.LOAD_PRODUCT:
      return {
        ...state,
      };
    case actions.types.LOAD_PRODUCT_SUCCESS:
      return {
        ...state,
        products: action.payload.data,
      };
    case actions.types.SELECTED_PAGE_PRODUCT:
      return {
        ...state,
        selectedPageProduct: action.payload.data,
      };
    case actions.types.SELECTED_CATEGORY:
      return {
        ...state,
        selectedCategory: action.payload.data,
      };
    case actions.types.SEARCH_VALUE:
      return {
        ...state,
        searchValue: action.payload.data,
      };
    case actions.types.SEARCH_VALUE_ORDER:
      return {
        ...state,
        searchValueOrders: action.payload.data,
      };
    case actions.types.TYPE_SEARCH_ORDER:
      return {
        ...state,
        typeSearchOrder: action.payload.data,
      };
    case actions.types.SELECTED_PAGE_ORDERS:
      return {
        ...state,
        selectedPageOrders: action.payload.data,
      };
    case actions.types.LOAD_ORDERS:
      return {
        ...state,
      };
    case actions.types.LOAD_ORDER_SUCCESS:
      return {
        ...state,
        ...{
          orders: action.payload.data,
        },
      };
    case actions.types.LOAD_TABLE:
      return {
        ...state,
      };
    case actions.types.LOAD_TABLE_SUCCESS:
      return {
        ...state,
        ...{
          tables: action.payload.data,
        },
      };
    case actions.types.STATE_TABLE:
      return {
        ...state,
        ...{
          stateTable: action.payload.data,
        },
      };
    case actions.types.SELECTED_PAGE_TABLE:
      return {
        ...state,
        ...{
          selectedPageTable: action.payload.data,
        },
      };
    case actions.types.SEARCH_VALUE_TABLE:
      return {
        ...state,
        ...{
          searchValueTable: action.payload.data,
        },
      };
    default:
      return state;
  }
};
export default OrderPageReducer;
