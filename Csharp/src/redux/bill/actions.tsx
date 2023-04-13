const types = {
  LOAD_DATA: "/bil/load-data",
  LOAD_DATA_SUCCESS: "/bill/bill-data",
  SELECTED_STATE_BILL: "/bill/selected-state-bill",
};
const action = {
  loadData: () => {
    return {
      type: types.LOAD_DATA,
    };
  },
  loadDataSuccess: (billData: any) => {
    return {
      type: types.LOAD_DATA_SUCCESS,
      payload: { billData },
    };
  },
  selectedStateBill: (selected: any) => {
    return {
      type: types.SELECTED_STATE_BILL,
      payload: { selected },
    };
  },
};

const actions = {
  types,
  action,
};

export default actions;
export const BillActions = action;
