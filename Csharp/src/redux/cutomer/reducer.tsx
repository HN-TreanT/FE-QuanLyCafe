import actions from "./actions";

const initAuth = {};
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

    default:
      return state;
  }
};
export default CustomerReducer;
