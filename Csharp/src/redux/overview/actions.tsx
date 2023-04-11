const types = {
  TIME_STATE: "overview/time-state",
  LOAD_DATA: "overview/load_data",
  LOAD_DATA_SUCCESS: "overview/load_data_success",
};

const action = {
  timeState: (timeState: any) => {
    return {
      type: types.TIME_STATE,
      payload: { timeState },
    };
  },
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
export const OverviewAction = action;
