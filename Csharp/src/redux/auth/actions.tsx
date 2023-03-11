const types = {
  UPDATE_LOGIN_INFO: "auth/update_login_info",
  USER_INFO: "auth/user_info",
  LOGIN: "auth/login",
};
const action = {
  updateLoginInfo: (loginInfo: any) => {
    return {
      type: types.UPDATE_LOGIN_INFO,
      payload: { loginInfo },
    };
  },
  userInfo: (userInfo: any) => {
    return {
      type: types.USER_INFO,
      payload: { userInfo },
    };
  },
  login: () => {
    return {
      type: types.LOGIN,
    };
  },
};

const actions = {
  types,
  action,
};

export default actions;
export const AuthActions = action;
