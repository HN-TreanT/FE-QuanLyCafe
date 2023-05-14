import React, { useState } from "react";
import { Input, Row, Col, Button, Modal, Image } from "antd";
import { useSelector } from "react-redux";
import "./ContentOrderDetail.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTable,
  faUsers,
  faFileLines,
  faMoneyBill1Wave,
  faFloppyDisk,
  faUtensils,
} from "@fortawesome/free-solid-svg-icons";
import ItemOrderDetail from "./ItemOrderDetail/ItemOrderDetail";
import ModalSplitOrder from "./ModalSplitOrder/ModalSplitOrder";
import DrawerPayment from "./DrawerPayment/DrawerPayment";
import SearchCustomer from "./SearchCustomer";
import emptyProduct from "../../../../assets/empty-data.jpg";
let data: any[] = [];
for (var i = 1; i < 20; i++) {
  data.push(i);
}
const ContentOrderDetail: React.FC = () => {
  const selectedOrder = useSelector(
    (state: any) => state.orderpage.selectedOrder
  );

  const [isOpenModalCountCustomer, setIsOpenModalCountModal] = useState(false);
  const [isOpenModalSplitOrder, setIsOpenModalSplitOrder] = useState(false);
  const [isOpenDrawer, setIsOpenDrawer] = useState(false);
  const handleClickIconCustomerOrder = () => {
    setIsOpenModalCountModal(true);
  };
  const handlClickIconSplitOrder = () => {
    setIsOpenModalSplitOrder(true);
  };
  const handleCLickOpenDrawerPayment = () => {
    setIsOpenDrawer(true);
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
              // formAddCustomer.resetFields();
            }}
          >
            Hủy
          </Button>,
          <Button
            //  disabled={isDisabled}
            key="submit"
            type="primary"
            // onClick={handleUpdateCustomer}
          >
            Lưu
          </Button>,
        ]}
      >
        <Input
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
      </Modal>
      {/* Modal split order */}
      <ModalSplitOrder
        visible={isOpenModalSplitOrder}
        setIsOpenModal={setIsOpenModalSplitOrder}
      />
      <div>
        <div className="top-content-order-detail">
          <Row gutter={[5, 0]}>
            <Col span={5}>
              {" "}
              <div className="select-table">
                <FontAwesomeIcon
                  style={{ paddingRight: "5px" }}
                  icon={faTable}
                />
                {/* bàn 1 */}
                {selectedOrder?.IdTableNavigation
                  ? `Bàn ${selectedOrder?.IdTableNavigation?.Name} `
                  : "Chọn bàn"}
              </div>
            </Col>
            <Col span={19}>
              <SearchCustomer />
            </Col>
          </Row>
        </div>
        <div className="middle-content-order-detail">
          {Array.isArray(selectedOrder?.OrderDetails) &&
          selectedOrder?.OrderDetails.length > 0 ? (
            selectedOrder?.OrderDetails.map((item: any) => (
              <ItemOrderDetail key={item?.IdOrderDetail} />
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
              <div
                onClick={handleClickIconCustomerOrder}
                className="count-customer-order"
              >
                <FontAwesomeIcon
                  className="icon-customer-order"
                  icon={faUsers}
                />
                <span>{selectedOrder?.Amount ? selectedOrder?.Amount : 0}</span>
              </div>
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
                {selectedOrder?.Price ? `${selectedOrder?.Price} đ` : `0 đ`}
              </span>
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
