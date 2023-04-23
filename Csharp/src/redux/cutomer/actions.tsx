const types = {
  LOAD_DATA: "/customer/load-data",
  LOAD_DATA_SUCCES: "/customer/load-data-success",
};
const action = {
  loadData: () => {
    return {
      type: types.LOAD_DATA,
    };
  },
  loadDataSuccess: (customers: any) => {
    return {
      type: types.LOAD_DATA_SUCCES,
      payload: { customers },
    };
  },
};

const actions = {
  types,
  action,
};

export default actions;
export const CustomerActions = action;
