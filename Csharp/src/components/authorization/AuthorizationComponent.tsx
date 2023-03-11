import { Navigate } from "react-router-dom";
import { RouterLinks } from "../../const";
import { useSelector } from "react-redux";

export const AuthorizationComponent = (props: any) => {
  const isLogin = useSelector((state: any) => state.state.loginState);

  if (isLogin) {
    return props.element;
  } else {
    return <Navigate to={RouterLinks.LOGIN_PAGE} />;
  }
};
