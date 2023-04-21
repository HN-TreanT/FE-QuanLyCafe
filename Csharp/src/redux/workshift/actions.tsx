const types = {
  LOAD_DATA: "workshift/load_data",
  LOAD_DATA_SUCCESS: "workshift/load_data_success",
};

const action = {
  loadData: () => {
    return {
      type: types.LOAD_DATA,
    };
  },
  loadDataSuccess: (data: any) => {
    return {
      type: types.LOAD_DATA_SUCCESS,
      payload: { data },
    };
  },
};
const actions = {
  types,
  action,
};
export default actions;
export const WorkshiftActions = action;
