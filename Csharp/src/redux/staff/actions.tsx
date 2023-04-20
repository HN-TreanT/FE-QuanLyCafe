const types = {
  LOAD_DATA: "/staff/load-data",
  LOAD_DATA_SUCCESS: "/staff/load-data-sucess",
  SELECTED_STATE_STAFF: "/staff/selected-state-staff",
};

const action = {
  loadData: () => {
    return {
      type: types.LOAD_DATA,
    };
  },
  loadDataSuccess: (staffs: any) => {
    return {
      type: types.LOAD_DATA_SUCCESS,
      payload: { staffs },
    };
  },
  seletedStateStaff: (state: any) => {
    return {
      type: types.SELECTED_STATE_STAFF,
      payload: { state },
    };
  },
};
const actions = {
  types,
  action,
};
export default actions;
export const StaffActions = action;
