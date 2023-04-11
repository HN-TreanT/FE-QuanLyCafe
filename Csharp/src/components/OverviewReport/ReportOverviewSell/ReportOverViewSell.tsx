import "./ReportOverViewSell.scss";
import React from "react";
import { Row, Col } from "antd";

export const ReportOverviewSell: React.FC = () => {
  return (
    <div className="RQ-sell-content">
      <Row gutter={[0, 15]}>
        <Col span={12}>
          <span>Tên sản phẩm</span>
        </Col>
        <Col span={6}>
          <span>Số lượng</span>
        </Col>
        <Col span={6}>
          <span>Tổng tiền</span>
        </Col>
        <Col span={24}>
          <div
            style={{
              height: "1px",
              border: "1px solid black",
              opacity: "0.1",
            }}
          ></div>
        </Col>
        {/* Danh sách sản phẩm bán chạy */}
        <Col span={12}>
          <div className="title-item">Mì tôm</div>
        </Col>
        <Col span={6}>
          <div className="title-item">15</div>
        </Col>
        <Col span={6}>
          <div className="title-item">1000000</div>
        </Col>

        <Col span={12}>
          <div className="title-item">Mì tôm</div>
        </Col>
        <Col span={6}>
          <div className="title-item">15</div>
        </Col>
        <Col span={6}>
          <div className="title-item">1000000</div>
        </Col>

        <Col span={12}>
          <div className="title-item">Mì tôm</div>
        </Col>
        <Col span={6}>
          <div className="title-item">15</div>
        </Col>
        <Col span={6}>
          <div className="title-item">1000000</div>
        </Col>

        <Col span={12}>
          <div className="title-item">Mì tôm</div>
        </Col>
        <Col span={6}>
          <div className="title-item">15</div>
        </Col>
        <Col span={6}>
          <div className="title-item">1000000</div>
        </Col>

        <Col span={12}>
          <div className="title-item">Mì tôm</div>
        </Col>
        <Col span={6}>
          <div className="title-item">15</div>
        </Col>
        <Col span={6}>
          <div className="title-item">1000000</div>
        </Col>
      </Row>
    </div>
  );
};
