import actions from "./actions";
const initState = {
  timeState: 1,
};
const OverviewReducer = (state: any = initState, action: any) => {
  switch (action.type) {
    case actions.types.TIME_STATE:
      return {
        ...state,
        ...{
          timeState: action.payload.timeState,
        },
      };
    case actions.types.LOAD_DATA:
      return {
        ...state,
      };
    case actions.types.LOAD_DATA_SUCCESS:
      return {
        ...state,
        ...{
          overviewData: action.payload.data,
        },
      };
    default:
      return state;
  }
};

export default OverviewReducer;
