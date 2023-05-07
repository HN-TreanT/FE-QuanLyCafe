import React from "react";
import { Col, Row } from "antd";
import OperationOrderPage from "./Operation-order-page/OperationOrderPage";
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
            <div className="order-detail"></div>
          </Col>
        </Row>
      </div>
    </div>
  );
};
export default OrderPage;
