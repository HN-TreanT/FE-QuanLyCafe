import actions from "./actions";
const initState = {
  loginState: false,
  loadingState: false,
};
const StateReducer = (state: any = initState, action: any) => {
  switch (action.type) {
    case actions.types.IS_LOADING:
      return {
        ...state,
        ...{
          loadingState: action.payload.isLoading,
        },
      };
    case actions.types.IS_lOGIN:
      return {
        ...state,
        ...{
          loginState: action.payload.isLogin,
        },
      };
    case actions.types.IS_SELECTED_MENU_ITEM:
      return {
        ...state,
        ...{
          isSelectedMenuItem: action.payload.isSelected,
        },
      };
    case actions.types.KEYS_OPEN:
      return {
        ...state,
        ...{
          keys: action.payload.keys,
        },
      };
    default:
      return state;
  }
};

export default StateReducer;
