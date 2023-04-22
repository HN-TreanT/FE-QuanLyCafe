const types = {
  LOAD_DATA: "workshift/load_data",
  LOAD_DATA_SUCCESS: "workshift/load_data_success",
  DETAIL_WORKSHIFT: "workshift/detail-workshift",
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
  setDetailWorkShift: (data: any) => {
    return {
      type: types.DETAIL_WORKSHIFT,
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
