import React from "react";
import { Button, Drawer, Row, Col, Table, Form } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleUser } from "@fortawesome/free-regular-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import actions from "../../../../../redux/auth/actions";
import "./DrawerPayment.scss";
import { ColumnsType } from "antd/es/table";
import { faDollar } from "@fortawesome/free-solid-svg-icons";
import moment from "moment";
import useAction from "../../../../../redux/useActions";

interface DataType {
  key: string;
  NameProduct: string;
  Amount: Number;
  Price: Number;
}
let data: any[] = [];
const DrawerPayment: React.FC<any> = ({ visible, setVisible }) => {
  const dispatch = useDispatch();
  const actions = useAction();
  const [form] = Form.useForm();
  const selectedOrder = useSelector(
    (state: any) => state.orderpage.selectedOrder
  );
  const [disabled, setDisabled] = React.useState(true);
  const [value, setValue] = React.useState<any>();
  if (Array.isArray(selectedOrder?.OrderDetails)) {
    data = selectedOrder?.OrderDetails.map((item: any) => {
      return {
        key: item?.IdOrderDetail,
        NameProduct: item?.IdProductNavigation?.Title,
        Amount: item?.Amout ? item?.Amout : 0,
        Price: item?.Price ? item?.Price : 0,
      };
    });
  }
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
    setValue(0);
    setVisible(false);
  };
  //const date = new Date(selectedOrder?.CreatedAt);
  const formattedDate = moment(selectedOrder?.CreatedAt)
    .utcOffset("+07:00")
    .format("HH:mm, DD-MM-YYYY");
  const handleChangeInput = (e: any) => {
    setValue(e.target.value);
    if (e.target.value && e.target.value - selectedOrder?.Price > 0) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  };
  const handleValueChange = () => {};
  return (
    <Drawer
      open={visible}
      title={`Thanh toán đơn #${selectedOrder?.IdOrder} ${
        selectedOrder?.IdTableNavigation
          ? `- Bàn ${selectedOrder?.IdTableNavigation?.Name}`
          : ""
      }`}
      onClose={onClickCloseDrawer}
      width={900}
      bodyStyle={{ paddingBottom: 80 }}
      footer={
        <div style={{ textAlign: "right" }}>
          <Button
            disabled={disabled}
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
                    {selectedOrder?.IdCustomerNavigation
                      ? selectedOrder?.IdCustomerNavigation?.Fullname
                      : "Khách lẻ"}
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
                  <span style={{ fontSize: "1rem" }}>{formattedDate}</span>
                </div>
                <div className="item-infor-payment">
                  <div>Tổng tiền hàng</div>
                  <span>
                    {selectedOrder?.Price < 1000000
                      ? `${selectedOrder?.Price ? selectedOrder?.Price : 0} đ`
                      : ` ${
                          selectedOrder?.Price
                            ? Math.round(selectedOrder?.Price / 10000) / 100
                            : 0
                        } tr(VNĐ)`}
                  </span>
                </div>
                {/* <div className="item-infor-payment">
                  <div>Giảm giá</div>
                  <Input
                    type="number"
                    style={{ borderRadius: "none" }}
                    className="input-number"
                  ></Input>
                </div> */}
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
                    {/* {selectedOrder?.Price} */}
                    {selectedOrder?.Price < 1000000
                      ? `${selectedOrder?.Price ? selectedOrder?.Price : 0} đ`
                      : ` ${
                          selectedOrder?.Price
                            ? Math.round(selectedOrder?.Price / 10000) / 100
                            : 0
                        } tr(VNĐ)`}
                  </span>
                </div>
                <div className="item-infor-payment">
                  <div>Khách thanh toán</div>
                  <Form form={form} onValuesChange={handleValueChange}>
                    <Form.Item
                      rules={[
                        {
                          required: true,
                          message: "Hãy nhập số tiền khách trả!",
                        },
                      ]}
                    >
                      <input
                        value={value}
                        type="number"
                        onChange={handleChangeInput}
                        className="input-number"
                        min="0"
                        onKeyDown={(e) => {
                          if (
                            e.key === "-" ||
                            e.key === "e" ||
                            e.key === "+" ||
                            e.key === "E"
                          ) {
                            e.preventDefault();
                          }
                        }}
                        required
                      ></input>
                    </Form.Item>
                  </Form>
                </div>
                <div className="item-infor-payment">
                  <div>Tiền thừa trả khách</div>
                  <span style={{ fontWeight: "500" }}>
                    {value - selectedOrder?.Price < 1000000
                      ? `${
                          selectedOrder?.Price
                            ? value - selectedOrder?.Price
                            : 0
                        } đ`
                      : ` ${
                          value - selectedOrder?.Price
                            ? Math.round(
                                (value - selectedOrder?.Price) / 10000
                              ) / 100
                            : 0
                        } tr(VNĐ)`}
                  </span>
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
