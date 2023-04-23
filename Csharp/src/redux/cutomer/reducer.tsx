import actions from "./actions";

const initAuth = {
  customers: [],
  selectedPage: 1,
};
const CustomerReducer = (state: any = initAuth, action: any) => {
  switch (action.type) {
    case actions.types.LOAD_DATA:
      return {
        ...state,
      };
    case actions.types.LOAD_DATA_SUCCES:
      return {
        ...state,
        ...{
          customers: action.payload.customers,
        },
      };
    case actions.types.SELECTED_PAGE:
      return {
        ...state,
        ...{
          selectedPage: action.payload.selectedPage,
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
export default CustomerReducer;
