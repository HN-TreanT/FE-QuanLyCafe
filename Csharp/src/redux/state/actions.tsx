const types = {
  IS_lOGIN: "state/is_login",
  IS_LOADING: "state/is_loading",
  IS_SELECTED_MENU_ITEM: "state/is_selected_menu_item",
  KEYS_OPEN: "state/keys_open",
};

const action = {
  loadingState(isLoading: boolean) {
    return {
      type: types.IS_LOADING,
      payload: { isLoading },
    };
  },
  loginState(isLogin: boolean) {
    return {
      type: types.IS_lOGIN,
      payload: { isLogin },
    };
  },
  selectedMenuItem(isSelected: any) {
    return {
      type: types.IS_SELECTED_MENU_ITEM,
      payload: { isSelected },
    };
  },
  keysOpen(keys: any) {
    return {
      type: types.KEYS_OPEN,
      payload: { keys },
    };
  },
};
const actions = {
  types,
  action,
};
export default actions;
export const StateAction = action;
