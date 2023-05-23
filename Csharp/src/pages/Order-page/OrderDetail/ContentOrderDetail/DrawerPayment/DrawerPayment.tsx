import React, { useEffect, useState } from "react";
import { Button, Drawer, Row, Col, Table, Form } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleUser } from "@fortawesome/free-regular-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import "./DrawerPayment.scss";
import { ColumnsType } from "antd/es/table";
import { faDollar } from "@fortawesome/free-solid-svg-icons";
import moment from "moment";
import useAction from "../../../../../redux/useActions";
import { useReactToPrint } from "react-to-print";
import { billServices } from "../../../../../untils/networks/services/billService";
import { notification } from "../../../../../components/notification";

interface DataType {
  key: string;
  NameProduct: string;
  Amount: Number;
  Price: Number;
}
let data: any[] = [];
const DrawerPayment: React.FC<any> = ({ visible, setVisible }) => {
  const componentRef = React.useRef<HTMLDivElement>(null);
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: "PrintReceipt",
  });
  const [hidden, setHidden] = useState(true);
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
  useEffect(() => {
    setValue(0);
  }, [visible]);
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
  const onClickCloseDrawer = async () => {
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
  const onClickPayOrder = async () => {
    try {
      dispatch(actions.StateAction.loadingState(true));
      setHidden(false);
      const response = await billServices.updateOrder(selectedOrder?.IdOrder, {
        Status: 1,
      });
      if (response.Status) {
        await handlePrint();
        dispatch(actions.OrderPageActions.setSelectedOrder({}));
        dispatch(actions.OrderPageActions.setPageOrderProductTable("allOrder"));
        dispatch(actions.OrderPageActions.loadSelectedOrder());
        dispatch(actions.OrderPageActions.loadTable());
        dispatch(actions.OrderPageActions.loadOrders());
        dispatch(actions.StateAction.loadingState(false));
        // setVisible(false);
        // setHidden(true);
        notification({
          message: "Thanh toán thành công",
          title: "Thông báo",
          position: "top-right",
          type: "success",
        });
      } else {
        notification({
          message: response?.Message,
          title: "Thông báo",
          position: "top-right",
          type: "danger",
        });
        dispatch(actions.StateAction.loadingState(false));
      }

      setVisible(false);
      setHidden(true);
    } catch (err: any) {
      console.log(err);
      dispatch(actions.StateAction.loadingState(false));

      setVisible(false);
      setHidden(true);
    }
  };
  return (
    <Drawer
      open={visible}
      title={`Thanh toán đơn #${selectedOrder?.IdOrder} ${
        selectedOrder?.IdTableNavigation
          ? `- Bàn ${selectedOrder?.IdTableNavigation?.Name}`
          : ""
      }`}
      onClose={onClickCloseDrawer}
      width={600}
      bodyStyle={{ paddingBottom: 80 }}
      footer={
        <div style={{ textAlign: "right" }}>
          <Button
            disabled={disabled}
            className="button-payment"
            onClick={onClickPayOrder}
            type="primary"
          >
            <FontAwesomeIcon style={{ paddingRight: "5px" }} icon={faDollar} />
            Thanh toán
          </Button>
        </div>
      }
    >
      <div ref={componentRef} className="drawer-payment-sidebar">
        <div className="content-drawer-payment-sidebar">
          <div
            style={hidden ? { display: "none" } : {}}
            className={`header-info-cafe`}
          >
            <div className="name-cafe">MTA-COFFEE</div>
            <div className="address-cafe">
              236,Hoàng Quốc Việt,Cổ Nhuế 1 ,Bắc Từ Liêm, Hà Nội
            </div>
            <div className="title-info-order">
              <div className="title">HÓA ĐƠN THANH TOÁN</div>
              <div className="id-order">{`Mã hóa đơn: ${selectedOrder?.IdOrder}`}</div>
              <div className="date-order">{`Ngày: ${moment(
                selectedOrder?.CreatedAt
              )
                .utcOffset("+07:00")
                .format(" DD-MM-YYYY")}`}</div>
            </div>
          </div>
          <Row gutter={[24, 10]}>
            <Col span={24}>
              <div className="info-order">
                <div className={`time-in-out ${hidden ? "hidden" : ""}`}>
                  <div>
                    <span
                      style={{ fontWeight: "500", fontSize: "1rem" }}
                    >{`Giờ vào: `}</span>{" "}
                    <span>
                      {moment(selectedOrder?.CreatedAt)
                        .utcOffset("+07:00")
                        .format("HH:mm, DD-MM-YYYY")}
                    </span>
                  </div>
                  <div>
                    <span
                      style={{ fontWeight: "500", fontSize: "1rem" }}
                    >{`Giờ ra: `}</span>{" "}
                    <span>
                      {moment(selectedOrder?.TimePay)
                        .utcOffset("+07:00")
                        .format("HH:mm, DD-MM-YYYY")}
                    </span>
                  </div>
                </div>
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
                    pageSize: 100,
                    showSizeChanger: false,
                    hideOnSinglePage: true,
                  }}
                />
              </div>
            </Col>
            <Col span={24}>
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
                  <div style={{ fontWeight: "500" }}>Tổng tiền hàng</div>
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
                  <div style={{ fontWeight: "500" }}>Khách thanh toán</div>
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
                  <div style={{ fontWeight: "500" }}>Tiền thừa trả khách</div>
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
