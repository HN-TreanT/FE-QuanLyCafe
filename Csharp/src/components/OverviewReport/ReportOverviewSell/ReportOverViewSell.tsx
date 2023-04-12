import "./ReportOverViewSell.scss";
import React from "react";
import { Row, Col } from "antd";
import { ImageEmptyData } from "../../ImageEmptyData/ImageEmptyData";

export const ReportOverviewSell: React.FC<any> = ({ data }) => {
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
        {Array.isArray(data) && data.length > 0 ? (
          data.map((dt: any) => {
            return (
              <React.Fragment key={dt.IdProduct}>
                <Col span={12}>
                  <div className="title-item">{dt.Title}</div>
                </Col>
                <Col span={6}>
                  <div className="title-item">{dt.TotalAmount}</div>
                </Col>
                <Col span={6}>
                  <div className="title-item">{dt.Price}</div>
                </Col>
              </React.Fragment>
            );
          })
        ) : (
          <Col span={24}>
            <ImageEmptyData />
          </Col>
        )}
      </Row>
    </div>
  );
};
