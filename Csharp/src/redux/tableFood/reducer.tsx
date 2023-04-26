import actions from "./actions";
const initState = {
  tableFoods: [],
  tableSelected: {
    IdTable: "",
    Name: 0,
    Status: 0,
  },
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
    case actions.types.TABLE_SELECTED:
      return {
        ...state,
        ...{
          tableSelected: action.payload.data,
        },
      };

    default:
      return state;
  }
};

export default TableFoodReducer;
