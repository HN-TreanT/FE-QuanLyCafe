import actions from "./actions";
const initState = {
  staffs: [],
  infoStaffCreate: {},
  detailStaff: {},
  selectedPage: 1,
  searchNameValue: "",
};
const StaffReducer = (state: any = initState, action: any) => {
  switch (action.type) {
    case actions.types.LOAD_DATA:
      return {
        ...state,
      };
    case actions.types.LOAD_DATA_SUCCESS:
      return {
        ...state,
        ...{ staffs: action.payload.staffs },
      };
    case actions.types.SELECTED_STAFF:
      return {
        ...state,
        ...{
          selectedStaff: action.payload.state,
        },
      };
    case actions.types.SET_INFO_STAFF_CREATE:
      return {
        ...state,
        ...{
          infoStaffCreate: action.payload.data,
        },
      };
    case actions.types.CREATE_STAFF:
      return {
        ...state,
      };
    case actions.types.DETAIL_STAFF:
      return {
        ...state,
        ...{
          detailStaff: action.payload.data,
        },
      };
    case actions.types.UPDATE_STAFF:
      return {
        ...state,
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

export default StaffReducer;
