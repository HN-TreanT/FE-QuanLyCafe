import React from "react";
import { Input, Row, Col, Button } from "antd";
import "./ContentOrderDetail.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTable,
  faMagnifyingGlass,
  faPlusCircle,
  faUsers,
  faFileLines,
  faMoneyBill1Wave,
  faFloppyDisk,
} from "@fortawesome/free-solid-svg-icons";
import ItemOrderDetail from "./ItemOrderDetail/ItemOrderDetail";
let data: any[] = [];
for (var i = 1; i < 20; i++) {
  data.push(i);
}
const ContentOrderDetail: React.FC = () => {
  return (
    <div className="content-order-detail">
      <div>
        <div className="top-content-order-detail">
          <Row gutter={[5, 0]}>
            <Col span={4}>
              {" "}
              <div className="select-table">
                <FontAwesomeIcon
                  style={{ paddingRight: "5px" }}
                  icon={faTable}
                />
                bàn 1
              </div>
            </Col>
            <Col span={12}>
              <Input
                className="input-search-order-detail"
                placeholder="Tìm khách hàng"
                suffix={
                  <FontAwesomeIcon
                    className="icon-add-customer-order-detail"
                    icon={faPlusCircle}
                  />
                }
                prefix={
                  <FontAwesomeIcon
                    className="icon-search-order-detail"
                    icon={faMagnifyingGlass}
                  />
                }
              />
            </Col>
          </Row>
        </div>
        <div className="middle-content-order-detail">
          {data.map((item: any) => (
            <ItemOrderDetail key={item} />
          ))}
        </div>
        <div className="footer-content-order-detail">
          <div className="info-order-detail">
            <div className="info-order-detail-left">
              <div className="count-customer-order">
                <FontAwesomeIcon
                  className="icon-customer-order"
                  icon={faUsers}
                />
                <span>0</span>
              </div>
              <div className="control-table">
                <FontAwesomeIcon
                  className="icon-control-table"
                  icon={faFileLines}
                />
                <span className="title-controle-table">Tách ghép</span>
              </div>
            </div>
            <div className="total-price-order">
              <span className="title-total-price-order">Tổng tiền:</span>
              <span className="price-total">394838732đ</span>
            </div>
          </div>
          <div className="button-control-order-detail">
            <div style={{ paddingLeft: "10px", paddingRight: "10px" }}>
              <Row gutter={[20, 10]}>
                <Col span={6}>
                  <Button danger className="button-controler-order">
                    <span className="title-button">Hủy</span>
                  </Button>
                </Col>
                <Col span={9}>
                  <Button type="primary" className="button-controler-order">
                    <FontAwesomeIcon
                      className="icon-button"
                      icon={faFloppyDisk}
                    />
                    <span className="title-button">Lưu</span>
                  </Button>
                </Col>
                <Col span={9}>
                  <Button
                    style={{ color: "white", backgroundColor: "#28B44F" }}
                    className="button-controler-order"
                  >
                    <FontAwesomeIcon
                      className="icon-button"
                      icon={faMoneyBill1Wave}
                    />
                    <span className="title-button">Thanh toán</span>
                  </Button>
                </Col>
              </Row>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ContentOrderDetail;
