const types = {
  LOAD_DATA: "/staff/load-data",
  LOAD_DATA_SUCCESS: "/staff/load-data-sucess",
  SELECTED_STAFF: "/staff/selected-staff",
  SET_INFO_STAFF_CREATE: "/staff/set-info-staff-create",
  CREATE_STAFF: "/staff/create-staff",
  DETAIL_STAFF: "/staff/detail-staff",
  UPDATE_STAFF: "/staff/update-staff",
  SELECTED_PAGE: "/staff/selected-page",
  SEARCH_VALUE: "/staff/search-value",
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
  seletedStaff: (state: any) => {
    return {
      type: types.SELECTED_STAFF,
      payload: { state },
    };
  },
  setInfoStaffCreate: (data: any) => {
    return {
      type: types.SET_INFO_STAFF_CREATE,
      payload: { data },
    };
  },
  createStaff: () => {
    return {
      type: types.CREATE_STAFF,
    };
  },
  setDetailStaff: (data: any) => {
    return {
      type: types.DETAIL_STAFF,
      payload: { data },
    };
  },
  handleUpdateStaff: () => {
    return {
      type: types.UPDATE_STAFF,
    };
  },
  setSelectedPage: (data: any) => {
    return {
      type: types.SELECTED_PAGE,
      payload: { data },
    };
  },
  setSearchValue: (data: any) => {
    return {
      type: types.SEARCH_VALUE,
      payload: { data },
    };
  },
};
const actions = {
  types,
  action,
};
export default actions;
export const StaffActions = action;
