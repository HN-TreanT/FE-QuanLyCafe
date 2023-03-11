import { Row, Col } from "antd";
import SideBar from "../../components/SideBar/SideBar";
import React from "react";
import { Outlet } from "react-router-dom";
import TopBar from "../../components/TopBar/TopBar";
import "./HomePage.scss";
const HomePage: React.FC = () => {
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
