import React from "react";
import { Row, Col, Input } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import "./ItemOrderDetail.scss";
const ItemOrderDetail: React.FC = () => {
  return (
    <div className="item-order-detail">
      <div className="content-item-order-detail">
        <Row gutter={[10, 10]}>
          <Col span={9}>
            <span className="name-product-order-detail">Phở bò cồ cử</span>
          </Col>
          <Col span={9}>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <div>
                {" "}
                <span style={{ paddingRight: "15px", fontWeight: "500" }}>
                  Số lượng:
                </span>
              </div>
              <span style={{ paddingRight: "10px" }}>X</span>
              <Input type="number" min={0}></Input>
            </div>
          </Col>
          <Col span={4}>
            <span>30000 đ</span>
          </Col>
          <Col span={1}>
            <FontAwesomeIcon
              className="icon-delete-order-detail"
              icon={faTrashCan}
            />
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default ItemOrderDetail;
