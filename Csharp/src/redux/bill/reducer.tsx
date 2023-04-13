import actions from "./actions";

const initAuth = {
  selectedStateBill: "getAllOrder",
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
    default:
      return state;
  }
};
export default BillReducer;
