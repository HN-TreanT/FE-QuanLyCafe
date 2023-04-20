import actions from "./actions";
const initState = {
  staffs: [],
  selectedStateStaff: "allStaff",
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
    case actions.types.SELECTED_STATE_STAFF:
      return {
        ...state,
        ...{
          selectedStateStaff: action.payload.state,
        },
      };
    default:
      return state;
  }
};

export default StaffReducer;
