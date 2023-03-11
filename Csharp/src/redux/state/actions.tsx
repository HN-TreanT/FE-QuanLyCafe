const types = {
  IS_lOGIN: "state/is_login",
  IS_LOADING: "state/is_loading",
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
};
const actions = {
  types,
  action,
};
export default actions;
export const StateAction = action;
