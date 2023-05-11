import React from "react";
import { Col, Row } from "antd";
import OperationOrderPage from "./Operation-order-page/OperationOrderPage";
import OrderDetail from "./OrderDetail/OrderDetail";
import "./OrderPage.scss";
const OrderPage: React.FC = () => {
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
        <div className="user-order-page">username</div>
      </div>
    </div>
  );
};
export default OrderPage;
