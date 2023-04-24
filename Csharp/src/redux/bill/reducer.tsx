import actions from "./actions";

const initAuth = {
  selectedStateBill: "getAllOrder",
  selectedRowKeys: [],
  selectedPage: 1,
};
const BillReducer = (state: any = initAuth, action: any) => {
  switch (action.type) {
    case actions.types.LOAD_DATA:
      return {
        ...state,
      };
    case actions.types.LOAD_DATA_SUCCESS:
      return {
        ...state,
        ...{
          billData: action.payload.billData,
        },
      };
    case actions.types.SELECTED_STATE_BILL:
      return {
        ...state,
        ...{
          selectedStateBill: action.payload.selected,
        },
      };
    case actions.types.DELETE_BILL:
      return {
        ...state,
      };
    case actions.types.SELECTED_ROW_KEYS:
      return {
        ...state,
        selectedRowKeys: action.payload.selectedRowKeys,
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
    default:
      return state;
  }
};
export default BillReducer;
