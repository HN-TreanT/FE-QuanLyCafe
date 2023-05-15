import React from "react";
import { Row, Col, Input } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import "./ItemOrderDetail.scss";
const ItemOrderDetail: React.FC<any> = ({ data }) => {
  return (
    <div className="item-order-detail">
      <div className="content-item-order-detail">
        <Row gutter={[10, 10]}>
          <Col span={9}>
            <span className="name-product-order-detail">{`${data?.IdProductNavigation.Title}`}</span>
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
              <Input defaultValue={data?.Amout} type="number" min={0}></Input>
            </div>
          </Col>
          <Col span={4}>
            <span>{`${data?.Price ? data?.Price : 0}`}</span>
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
