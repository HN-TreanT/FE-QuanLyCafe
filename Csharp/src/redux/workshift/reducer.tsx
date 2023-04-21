import actions from "./actions";
const initState = {
  workshifts: [],
};
const WorkshiftReducer = (state: any = initState, action: any) => {
  switch (action.type) {
    case actions.types.LOAD_DATA:
      return {
        ...state,
      };
    case actions.types.LOAD_DATA_SUCCESS:
      return {
        ...state,
        ...{
          workshifts: action.payload.data,
        },
      };
    default:
      return state;
  }
};

export default WorkshiftReducer;
