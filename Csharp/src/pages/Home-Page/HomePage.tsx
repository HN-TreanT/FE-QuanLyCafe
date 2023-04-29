import { Row, Col } from "antd";
import SideBar from "../../components/SideBar/SideBar";
import React, { useEffect } from "react";
import { Navigate, useNavigate, Outlet } from "react-router-dom";
import TopBar from "../../components/TopBar/TopBar";
import { useDispatch, useSelector } from "react-redux";
import useAction from "../../redux/useActions";
import "./HomePage.scss";
import { RouterLinks } from "../../const";
const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const actions = useAction();
  const selectedPage = useSelector(
    (state: any) => state.state.isSelectedMenuItem
  );
  var url: any;
  if (!selectedPage) {
    dispatch(actions.StateAction.selectedMenuItem("overview"));
    url = RouterLinks.OVERVIEW_PAGE;
  }
  if (selectedPage === "overview") {
    url = RouterLinks.OVERVIEW_PAGE;
  }
  if (selectedPage === "bill") {
    url = RouterLinks.BILL_PAGE;
  }
  if (selectedPage === "products") {
    url = RouterLinks.PRODUCTS_PAGE;
  }
  if (selectedPage === "category") {
    url = RouterLinks.CATEGORY_PAGE;
  }
  if (selectedPage === "staff") {
    url = RouterLinks.STAFF_PAGE;
  }
  if (selectedPage === "workshift") {
    url = RouterLinks.WORKSHIFT_PAGE;
  }
  if (selectedPage === "customer") {
    url = RouterLinks.CUTOMER_PAGE;
  }
  if (selectedPage === "tablefood") {
    url = RouterLinks.TABLE_PAGE;
  }
  if (selectedPage === "list") {
    url = RouterLinks.LIST_WAREHOUSE;
  }
  if (selectedPage === "import") {
    url = RouterLinks.IMPORT_WAREHOUSE;
  }
  if (selectedPage === "history") {
    url = RouterLinks.HISTORY_WAREHOUSE;
  }
  useEffect(() => {
    navigate(url);
    // dispatch(actions.StateAction.selectedMenuItem("overview"));
  }, []);
  return (
    <div className="container">
      <Row>
        <Col xl={4} sm={0}>
          <SideBar />
        </Col>
        <Col xl={20} sm={24}>
          <div className="content">
            <Row>
              <Col xl={24}>
                <TopBar />
              </Col>
            </Row>
            <Row>
              <Col xl={24}>
                <div className="container_content_page">
                  <div className="content_page">
                    <Outlet />
                  </div>
                </div>
              </Col>
            </Row>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default HomePage;
