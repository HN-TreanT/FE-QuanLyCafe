import React from "react";
import { Col, Form, Input, Pagination, Row } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFileInvoiceDollar,
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";
import ItemOrder from "../../ItemOrder/ItemOrder";
import "./Order.scss";
const Order: React.FC = () => {
  return (
    <div className="order">
      <Row gutter={[15, 0]}>
        <Col span={20}>
          <Form style={{ marginTop: "15px" }}>
            <Row gutter={[30, 0]}>
              <Col span={8}>
                <Form.Item
                  name="Id"
                  className="input-search-import-warehouse input-label-inline-border"
                >
                  <label className="ant-form-item-label" htmlFor="">
                    Tên khách hàng
                  </label>
                  <Input
                    bordered={false}
                    placeholder="Nhập tên khách hàng"
                    //onChange={handleSearchNameCustomer}
                    prefix={
                      <FontAwesomeIcon
                        //  onClick={handleClickSearchId}
                        icon={faMagnifyingGlass}
                        className="icon-search"
                      />
                    }
                  />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item
                  name="nameMaterial"
                  className="input-search-import-warehouse input-label-inline-border"
                >
                  <label className="ant-form-item-label" htmlFor="">
                    Số điện thoại
                  </label>
                  <Input
                    //onChange={handleSearchPhoneCustomer}
                    bordered={false}
                    placeholder="Nhập tên nguyên liệu"
                    prefix={
                      <FontAwesomeIcon
                        icon={faMagnifyingGlass}
                        className="icon-search"
                      />
                    }
                  />
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item
                  name="time"
                  className="input-search-import-warehouse input-label-inline-border"
                >
                  <label className="ant-form-item-label" htmlFor="">
                    Nhập tên bàn ăn
                  </label>
                  <Input
                    // onChange={handlSearchTableFood}
                    bordered={false}
                    placeholder="Nhập tên bàn ăn"
                    prefix={
                      <FontAwesomeIcon
                        icon={faMagnifyingGlass}
                        className="icon-search"
                      />
                    }
                  />
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </Col>

        <Col style={{ marginTop: "24px" }} span={4}>
          <FontAwesomeIcon
            style={{
              paddingRight: "10px",
              fontSize: "1.1rem",
              color: "#1677ff",
            }}
            icon={faFileInvoiceDollar}
          />
          <span>{`Chờ thanh toán(5)`}</span>
        </Col>
        <Col span={24}>
          <div
            style={{
              border: "0.5px solid black",
              opacity: "0.05",
            }}
          ></div>
        </Col>
        <Col span={24}>
          <div className="content-tab-order">
            <div className="list-order">
              <Row gutter={[40, 35]}>
                <Col span={8}>
                  <ItemOrder />
                </Col>
                <Col span={8}>
                  <ItemOrder />
                </Col>
                <Col span={8}>
                  <ItemOrder />
                </Col>
                <Col span={8}>
                  <ItemOrder />
                </Col>
                <Col span={8}>
                  <ItemOrder />
                </Col>
                <Col span={8}>
                  <ItemOrder />
                </Col>
              </Row>
            </div>
            <div className="pagination-order-tab">
              <Pagination defaultCurrent={6} total={500} />
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
};
export default Order;
