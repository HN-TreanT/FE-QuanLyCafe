import actions from "./actions";

const initAuth = {
  user_name: "",
  passwork: "",
};
const AuthReducer = (state: any = initAuth, action: any) => {
  switch (action.type) {
    case actions.types.UPDATE_LOGIN_INFO:
      return {
        ...state,
        ...{
          login_info: action.payload.loginInfo,
        },
      };
    case actions.types.USER_INFO:
      return {
        ...state,
        ...{
          user_info: action.payload.userInfo,
        },
      };

    default:
      return state;
  }
};
export default AuthReducer;
