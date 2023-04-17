import actions from "./actions";

const initAuth = {
  selectedStateBill: "getAllOrder",
  selectedRowKeys: [],
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
    default:
      return state;
  }
};
export default BillReducer;
