import actions from "./actions";
const initState = {
  tableFoods: [],
  tableSelected: {
    IdTable: "",
    Name: 0,
    Status: 0,
  },
  page: 1,
};
const TableFoodReducer = (state: any = initState, action: any) => {
  switch (action.type) {
    case actions.types.LOAD_DATA:
      return {
        ...state,
      };
    case actions.types.LOAD_DATA_SUCCESS:
      return {
        ...state,
        ...{ tableFoods: action.payload.data },
      };
    case actions.types.PAGE:
      return {
        ...state,
        ...{
          page: action.payload.data,
        },
      };
    default:
      return state;
  }
};

export default TableFoodReducer;
