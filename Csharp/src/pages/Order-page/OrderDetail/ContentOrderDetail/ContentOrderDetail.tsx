import React, { useEffect, useState } from "react";
import { Input, Row, Col, Button, Modal, Tooltip, Form } from "antd";
import "./ContentOrderDetail.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTable,
  faUsers,
  faFileLines,
  faMoneyBill1Wave,
  faFloppyDisk,
  faUtensils,
  faSquareCheck,
  faBan,
} from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import useAction from "../../../../redux/useActions";
import ItemOrderDetail from "./ItemOrderDetail/ItemOrderDetail";
import ModalSplitOrder from "./ModalSplitOrder/ModalSplitOrder";
import DrawerPayment from "./DrawerPayment/DrawerPayment";
import SearchCustomer from "./SearchCustomer";
import ModalTable from "./ModalTable/ModalTable";

const ContentOrderDetail: React.FC = () => {
  const [formAmountCustomer] = Form.useForm();
  const dispatch = useDispatch();
  const actions = useAction();
  const selectedOrder = useSelector(
    (state: any) => state.orderpage.selectedOrder
  );
  const [isOpenModalCancleOrder, setIsOpenCancleOrder] = useState(false);
  const [isOpenModalTable, setIsOpenModalTable] = useState(false);
  const [isOpenModalCountCustomer, setIsOpenModalCountModal] = useState(false);
  const [isOpenModalSplitOrder, setIsOpenModalSplitOrder] = useState(false);
  const [isOpenDrawer, setIsOpenDrawer] = useState(false);
  const [amountCustomer, setAmountCustomer] = useState();
  const [order, setOrder] = useState({
    ...selectedOrder,
    IdTableNavigation: selectedOrder?.IdTableNavigation,
    IdCustomerNavigation: selectedOrder?.IdCustomerNavigation,
  });
  useEffect(() => {
    setOrder({
      ...selectedOrder,
      IdTableNavigation: selectedOrder?.IdTableNavigation,
      IdCustomerNavigation: selectedOrder?.IdCustomerNavigation,
    });
  }, [selectedOrder]);
  const handleClickIconCustomerOrder = () => {
    setIsOpenModalCountModal(true);
  };
  const handlClickIconSplitOrder = () => {
    dispatch(actions.OrderPageActions.loadSelectedOrder());
    setIsOpenModalSplitOrder(true);
  };
  const handleCLickOpenDrawerPayment = () => {
    setIsOpenDrawer(true);
  };

  const handleClickSelectTable = () => {
    setIsOpenModalTable(true);
  };
  const handleCancleOrder = () => {
    dispatch(actions.OrderPageActions.deleteOrder());
    setIsOpenCancleOrder(false);
  };
  return (
    <div className="content-order-detail">
      {/* Drawer payment  */}
      <DrawerPayment visible={isOpenDrawer} setVisible={setIsOpenDrawer} />
      {/* Modal edit count customer */}
      <Modal
        title="Thêm số lượng khách hàng"
        open={isOpenModalCountCustomer}
        onCancel={() => setIsOpenModalCountModal(false)}
        footer={[
          <Button
            key="cancle"
            onClick={() => {
              setIsOpenModalCountModal(false);
              formAmountCustomer.resetFields();
            }}
          >
            Hủy
          </Button>,
          <Button
            //  disabled={isDisabled}
            key="submit"
            type="primary"
            onClick={() => {
              dispatch(
                actions.OrderPageActions.setInfoUpdateOrder({
                  IdOrder: selectedOrder?.IdOrder,
                  Amount: amountCustomer,
                })
              );
              dispatch(actions.OrderPageActions.updateOrder());
              setIsOpenModalCountModal(false);
            }}
          >
            Lưu
          </Button>,
        ]}
      >
        <Form form={formAmountCustomer}>
          <Form.Item
            name="amountCustomer"
            initialValue={order?.Amount ? order?.Amount : 0}
          >
            <Input
              onChange={(e: any) => setAmountCustomer(e.target.value)}
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
              min={0}
              placeholder="Nhập số lượng khách hàng"
              type="number"
            ></Input>
          </Form.Item>
        </Form>
      </Modal>
      {/* Modal split order */}
      <ModalSplitOrder
        visible={isOpenModalSplitOrder}
        setIsOpenModal={setIsOpenModalSplitOrder}
      />
      {/* Modal select table */}
      <ModalTable
        visible={isOpenModalTable}
        setVisible={setIsOpenModalTable}
        order={order}
        setOrder={setOrder}
      />
      {/* Modal announce cancle order */}
      <Modal
        open={isOpenModalCancleOrder}
        title="Thông báo"
        onCancel={() => setIsOpenCancleOrder(false)}
        footer={[
          <Button onClick={handleCancleOrder} danger key="submit">
            <FontAwesomeIcon
              style={{ paddingRight: "5px" }}
              icon={faSquareCheck}
            />
            <span> Đồng ý</span>
          </Button>,
          <Button
            key="back"
            onClick={() => {
              setIsOpenCancleOrder(false);
            }}
          >
            <FontAwesomeIcon style={{ paddingRight: "5px" }} icon={faBan} />
            <span> Bỏ qua</span>
          </Button>,
        ]}
      >
        {" "}
        <div>Bạn có chắc muốn hủy đơn!</div>
      </Modal>
      <div>
        <div className="top-content-order-detail">
          <Row gutter={[5, 0]}>
            <Col span={5}>
              {" "}
              <div onClick={handleClickSelectTable} className="select-table">
                <FontAwesomeIcon
                  style={{ paddingRight: "5px" }}
                  icon={faTable}
                />
                {order?.IdTableNavigation
                  ? `Bàn ${order?.IdTableNavigation?.Name} `
                  : "Chọn bàn"}
              </div>
            </Col>
            <Col span={19}>
              <SearchCustomer />
            </Col>
          </Row>
        </div>
        <div className="middle-content-order-detail">
          {Array.isArray(order?.OrderDetails) &&
          order?.OrderDetails.length > 0 ? (
            order?.OrderDetails.map((item: any) => (
              <ItemOrderDetail data={item} key={item?.IdOrderDetail} />
            ))
          ) : (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                paddingTop: "200px",
              }}
            >
              <FontAwesomeIcon
                style={{ fontSize: "3rem", color: " rgba(0, 0, 0, 0.414)" }}
                icon={faUtensils}
              />
              <div
                style={{ fontWeight: "500", color: " rgba(0, 0, 0, 0.414)" }}
              >
                Chưa thêm món ăn nào
              </div>
            </div>
          )}
        </div>
        <div className="footer-content-order-detail">
          <div className="info-order-detail">
            <div className="info-order-detail-left">
              <Tooltip placement="top" title="Số lượng khách hàng">
                <div
                  onClick={handleClickIconCustomerOrder}
                  className="count-customer-order"
                >
                  <FontAwesomeIcon
                    className="icon-customer-order"
                    icon={faUsers}
                  />
                  <span>{order?.Amount ? order?.Amount : 0}</span>
                </div>
              </Tooltip>
              <div onClick={handlClickIconSplitOrder} className="control-table">
                <FontAwesomeIcon
                  className="icon-control-table"
                  icon={faFileLines}
                />
                <span className="title-controle-table">Tách ghép</span>
              </div>
            </div>
            <div className="total-price-order">
              <span className="title-total-price-order">Tổng tiền:</span>
              <span className="price-total">
                {order?.Price ? `${order?.Price} đ` : `0 đ`}
              </span>
            </div>
          </div>
          <div className="button-control-order-detail">
            <div style={{ paddingLeft: "10px", paddingRight: "10px" }}>
              <Row gutter={[20, 10]}>
                <Col span={6}>
                  <Button
                    onClick={() => setIsOpenCancleOrder(true)}
                    danger
                    className="button-controler-order"
                  >
                    <span className="title-button">Hủy Đơn</span>
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
                    onClick={handleCLickOpenDrawerPayment}
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
