import { Navigate } from "react-router-dom";
import { RouterLinks } from "../../const";
import { useSelector, useDispatch } from "react-redux";
import useAction from "../../redux/useActions";

export const AuthorizationComponent = (props: any) => {
  const isLogin = useSelector((state: any) => state.state.loginState);
  const dispatch = useDispatch();
  const actions = useAction();
  const selectedPage = useSelector(
    (state: any) => state.state.isSelectedMenuItem
  );
  console.log("check selectedPage", selectedPage);
  if (isLogin) {
    return props.element;
  } else {
    return <Navigate to={RouterLinks.LOGIN_PAGE} />;
  }
};
