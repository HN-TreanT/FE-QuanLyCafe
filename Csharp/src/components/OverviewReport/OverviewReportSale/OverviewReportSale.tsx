import "./OverviewReportSale.scss";
import React from "react";
import { GiftOutlined } from "@ant-design/icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {} from "@fortawesome/fontawesome-svg-core";
import {} from "@fortawesome/free-solid-svg-icons";
import {} from "@fortawesome/free-regular-svg-icons";
import { Row, Col } from "antd";
import DataEmpty from "../../../assets/empty-data.jpg";
import { ImageEmptyData } from "../../ImageEmptyData/ImageEmptyData";

export const OverviewReportBill: React.FC<any> = ({ promotions }) => {
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

        {Array.isArray(promotions) && promotions.length > 0 ? (
          promotions.map((pro: any) => {
            const date = new Date(pro?.TimeEnd);
            const formattedDate = date.toLocaleDateString("vi-VN");
            return (
              <React.Fragment key={pro.IdPromotion}>
                <Col span={2}>
                  {" "}
                  <GiftOutlined style={{ fontSize: "1.1rem" }} />
                </Col>
                <Col span={16}>{pro?.Name}</Col>
                <Col span={6}>{formattedDate}</Col>
              </React.Fragment>
            );
          })
        ) : (
          <Col span={24}>
            <div className="empty-data">
              <ImageEmptyData imagePath={DataEmpty} width={110} height={110} />
            </div>
          </Col>
        )}
      </Row>
    </div>
  );
};
