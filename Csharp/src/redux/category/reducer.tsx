import actions from "./actions";

const initAuth = {
  categories: [],
};
const CategoryReducer = (state: any = initAuth, action: any) => {
  switch (action.type) {
    case actions.types.LOAD_DATA:
      return {
        ...state,
      };
    case actions.types.LOAD_DATA_SUCCES:
      return {
        ...state,
        ...{
          categories: action.payload.categories,
        },
      };
    default:
      return state;
  }
};
export default CategoryReducer;
