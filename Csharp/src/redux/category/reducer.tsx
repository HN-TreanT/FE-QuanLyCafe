import actions from "./actions";

const initAuth = {
  categories: [],
  categorySelected: {},
  IdProductSelected: "",
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
    case actions.types.CATEGORY_SELECTED:
      return {
        ...state,
        ...{
          categorySelected: action.payload.category,
        },
      };
    case actions.types.SELECTED_ROW:
      return {
        ...state,
        ...{
          selectedRow: action.payload.data,
        },
      };
    case actions.types.LOAD_CATEGORY_DETAIL:
      return {
        ...state,
      };
    case actions.types.LOAD_CATEGORY_DETAIL_SUCCESS:
      return {
        ...state,
        ...{
          categoryDetail: action.payload.data,
        },
      };
    default:
      return state;
  }
};
export default CategoryReducer;
