import React from "react";
import { Col, MenuProps, Row, Dropdown } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import OperationOrderPage from "./Operation-order-page/OperationOrderPage";
import OrderDetail from "./OrderDetail/OrderDetail";
import "./OrderPage.scss";

const OrderPage: React.FC = () => {
  const items: MenuProps["items"] = [
    {
      label: (
        <div>
          <FontAwesomeIcon
            style={{ paddingRight: "10px", color: "rgba(0, 0, 0, 0.626)" }}
            icon={faUser}
          />
          <span style={{ fontWeight: "500" }}>Tài khoản</span>
        </div>
      ),
      key: "detailUser",
    },
    {
      label: (
        <div>
          <FontAwesomeIcon
            style={{ paddingRight: "10px", color: "rgba(0, 0, 0, 0.626)" }}
            icon={faRightFromBracket}
          />
          <span style={{ fontWeight: "500" }}>Đăng xuất</span>
        </div>
      ),
      key: "logout",
    },
  ];
  return (
    <div className="order-page">
      <div className="content-order-page">
        <Row gutter={[20, 20]}>
          <Col span={15}>
            <OperationOrderPage />
          </Col>
          <Col span={9}>
            <OrderDetail />
          </Col>
        </Row>
        <Dropdown menu={{ items }} trigger={["click"]}>
          <div className="user-order-page">
            <span className="name-user-order-page">Hoàng Nam</span>
            <FontAwesomeIcon className="icon-user-order-page" icon={faUser} />
          </div>
        </Dropdown>
      </div>
    </div>
  );
};
export default OrderPage;
