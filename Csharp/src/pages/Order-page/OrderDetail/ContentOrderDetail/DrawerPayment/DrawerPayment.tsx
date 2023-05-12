import React from "react";
import {
  Button,
  Drawer,
  Form,
  Input,
  Row,
  Col,
  Table,
  InputNumber,
} from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleUser } from "@fortawesome/free-regular-svg-icons";
import "./DrawerPayment.scss";
import { ColumnsType } from "antd/es/table";
import { faDollar } from "@fortawesome/free-solid-svg-icons";

interface DataType {
  key: string;
  NameProduct: string;
  Amount: Number;
  Price: Number;
}
let data: any[] = [];
for (var i = 0; i < 10; i++) {
  data.push({
    key: i,
    NameProduct: `Sản phẩm ${i}`,
    Amount: i + 1,
    Price: 6352 + i * 5,
  });
}
const DrawerPayment: React.FC<any> = ({ visible, setVisible }) => {
  const columns: ColumnsType<DataType> = [
    {
      title: "Tên món ăn",
      dataIndex: "NameProduct",
    },
    {
      title: "Số lượng",
      dataIndex: "Amount",
    },
    {
      title: "Tổng tiền",
      dataIndex: "Price",
      render: (text: any) => <div style={{ color: "#1677ff " }}>{text}</div>,
    },
  ];
  const onClickCloseDrawer = () => {
    setVisible(false);
  };
  return (
    <Drawer
      open={visible}
      title="Thanh toán #24734 - Bàn 1"
      onClose={onClickCloseDrawer}
      width={900}
      bodyStyle={{ paddingBottom: 80 }}
      footer={
        <div style={{ textAlign: "right" }}>
          <Button
            className="button-payment"
            onClick={onClickCloseDrawer}
            type="primary"
          >
            <FontAwesomeIcon style={{ paddingRight: "5px" }} icon={faDollar} />
            Thanh toán
          </Button>
        </div>
      }
    >
      <div className="drawer-payment-sidebar">
        <div className="content-drawer-payment-sidebar">
          <Row gutter={[24, 10]}>
            <Col span={14}>
              <div className="info-order">
                <div className="info-customer">
                  <FontAwesomeIcon
                    style={{
                      paddingRight: "5px",
                      fontSize: "1.2rem",
                      color: " rgba(0, 0, 0, 0.621)",
                    }}
                    icon={faCircleUser}
                  />
                  <span style={{ fontWeight: "500", fontSize: "1rem" }}>
                    Tên khách hàng
                  </span>
                </div>
                <Table
                  //loading={loading}
                  //style={{ marginLeft: "20px" }}
                  columns={columns}
                  dataSource={data}
                  pagination={{
                    pageSize: 5,
                    showSizeChanger: false,
                    hideOnSinglePage: true,
                  }}
                />
              </div>
            </Col>
            <Col span={10}>
              <div className="info-payment">
                <div
                  style={{
                    color: " rgba(0, 0, 0, 0.621)",
                    justifyContent: "flex-end",
                    //display: "flex",
                  }}
                  className="item-infor-payment"
                >
                  <span style={{ fontSize: "1rem" }}>12/05/2023 23:23</span>
                </div>
                <div className="item-infor-payment">
                  <div>Tổng tiền hàng</div>
                  <span>746234</span>
                </div>
                <div className="item-infor-payment">
                  <div>Giảm giá</div>
                  <Input
                    type="number"
                    style={{ borderRadius: "none" }}
                    className="input-number"
                  ></Input>
                </div>
                <div className="item-infor-payment">
                  <div style={{ fontWeight: "500", fontSize: "1rem" }}>
                    Khách cần trả
                  </div>
                  <span
                    style={{
                      fontSize: "1.1rem",
                      fontWeight: "500",
                      color: "#1677ff ",
                    }}
                  >
                    482394
                  </span>
                </div>
                <div className="item-infor-payment">
                  <div>Khách thanh toán</div>
                  <Input type="number" className="input-number"></Input>
                </div>
                <div className="item-infor-payment">
                  <div>Tiền thừa trả khách</div>
                  <span style={{ fontWeight: "500" }}>4237864</span>
                </div>
              </div>
            </Col>
          </Row>
        </div>
      </div>
    </Drawer>
  );
};
export default DrawerPayment;
