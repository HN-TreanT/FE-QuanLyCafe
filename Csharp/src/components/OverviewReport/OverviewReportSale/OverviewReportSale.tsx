import "./OverviewReportSale.scss";
import React from "react";
import { GiftOutlined } from "@ant-design/icons";
import { Row, Col } from "antd";

export const OverviewReportBill: React.FC = () => {
  return (
    <div className="overview-report-bill">
      <Row gutter={[0, 15]}>
        <Col span={18}>
          <span style={{ fontWeight: "640" }}>Tên Khuyến Mãi</span>
        </Col>
        <Col span={6}>
          <span style={{ fontWeight: "0.7" }}>Thời gian Kết thúc</span>
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
        {/* Danh sách các khuyến mãi còn hạn */}
        <Col span={2}>
          {" "}
          <GiftOutlined style={{ fontSize: "1.1rem" }} />
        </Col>
        <Col span={16}>Mua 2 ly cafe được giảm giá 20%</Col>
        <Col span={6}>23/01/2002</Col>

        <Col span={2}>
          {" "}
          <GiftOutlined style={{ fontSize: "1.1rem" }} />
        </Col>
        <Col span={16}>Mua 2 ly cafe được giảm giá 20%</Col>
        <Col span={6}>23/01/2002</Col>

        <Col span={2}>
          {" "}
          <GiftOutlined style={{ fontSize: "1.1rem" }} />
        </Col>
        <Col span={16}>Mua 2 ly cafe được giảm giá 20%</Col>
        <Col span={6}>23/01/2002</Col>

        <Col span={2}>
          {" "}
          <GiftOutlined style={{ fontSize: "1.1rem" }} />
        </Col>
        <Col span={16}>Mua 2 ly cafe được giảm giá 20%</Col>
        <Col span={6}>23/01/2002</Col>

        <Col span={2}>
          {" "}
          <GiftOutlined style={{ fontSize: "1.1rem" }} />
        </Col>
        <Col span={16}>Mua 2 ly cafe được giảm giá 20%</Col>
        <Col span={6}>23/01/2002</Col>
      </Row>
    </div>
  );
};
