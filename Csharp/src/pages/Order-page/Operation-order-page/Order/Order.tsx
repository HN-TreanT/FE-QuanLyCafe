import React, { useEffect, useState } from "react";
import { Col, Form, Input, Pagination, Row, Image } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFileInvoiceDollar,
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import useDebounce from "../../../../hooks/useDebounce";
import useAction from "../../../../redux/useActions";
import ItemOrder from "../../ItemOrder/ItemOrder";
import "./Order.scss";
import Spinn from "../../../../components/Spinning/Spinning";
import emptyOrder from "../../../../assets/empty-bill.svg";
const Order: React.FC = () => {
  //let data: any[] = [];
  const dispatch = useDispatch();
  const actions = useAction();
  const [searchValue, setSearchValue] = useState("");
  const searchValueDebounce = useDebounce<string>(searchValue, 500);
  const orders = useSelector((state: any) => state.orderpage.orders);
  const loading = useSelector((state: any) => state.state.loadingState);
  const selectedPageOrders = useSelector(
    (state: any) => state.orderpage.selectedPageOrders
  );
  // if (Array.isArray(orders?.Data)) {
  //   data = orders?.Data?.map((order: any) => {
  //     const date = new Date(order?.TimePay);
  //     const formattedDate = date.toLocaleDateString("vi-VN");
  //     return {
  //       key: order?.IdOrder,
  //       timepay: order.TimePay ? formattedDate : "Chưa thanh toán",
  //       Id: order?.IdOrder,
  //       table: order?.NameTable ? `Bàn ${order?.NameTable}` : "Đã xóa",
  //       customer: order?.Fullname,
  //       money: order?.payments ? order.payments : 0,
  //       phonenumber: order?.PhoneNumber,
  //     };
  //   });
  // }
  useEffect(() => {
    dispatch(actions.OrderPageActions.setSearchValueOrder(searchValueDebounce));
    dispatch(actions.OrderPageActions.loadOrders());
  }, [
    dispatch,
    actions.OrderPageActions,
    selectedPageOrders,
    searchValueDebounce,
  ]);

  const handleSearchNameCustomer = (e: any) => {
    dispatch(actions.OrderPageActions.setTypeSearchValueOrder("nameCustomer"));
    dispatch(actions.OrderPageActions.setSelectedPageOrders(1));
    setSearchValue(e.target.value);
  };
  const handleSearchPhoneCustomer = (e: any) => {
    dispatch(actions.OrderPageActions.setTypeSearchValueOrder("phonenumber"));
    dispatch(actions.OrderPageActions.setSelectedPageOrders(1));
    setSearchValue(e.target.value);
  };
  const handlSearchTableFood = (e: any) => {
    dispatch(actions.OrderPageActions.setTypeSearchValueOrder("tableFood"));
    dispatch(actions.OrderPageActions.setSelectedPageOrders(1));
    setSearchValue(e.target.value);
  };
  const handleChangePag = (e: any) => {
    dispatch(actions.OrderPageActions.setSelectedPageOrders(e));
  };
  return (
    <div className="order">
      {loading ? <Spinn /> : ""}
      <Row gutter={[15, 0]}>
        <Col span={19}>
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
                    onChange={handleSearchNameCustomer}
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
                    onChange={handleSearchPhoneCustomer}
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
                    onChange={handlSearchTableFood}
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

        <Col style={{ marginTop: "24px" }} span={5}>
          <FontAwesomeIcon
            style={{
              paddingRight: "10px",
              fontSize: "1.1rem",
              color: "#1677ff",
            }}
            icon={faFileInvoiceDollar}
          />
          <span>{`Chờ thanh toán(${
            orders?.TotalPage ? orders.TotalPage : 0
          })`}</span>
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
                {Array.isArray(orders?.Data) && orders?.Data.length > 0 ? (
                  orders?.Data.map((item: any) => {
                    return (
                      <Col key={item?.IdOrder} span={8}>
                        <ItemOrder data={item} />
                      </Col>
                    );
                  })
                ) : (
                  <div className="empty-order-in-order-page">
                    <Image src={emptyOrder} preview={false} />
                    <div style={{ fontWeight: "600", paddingLeft: "20px" }}>
                      Không có hóa đơn nào
                    </div>
                  </div>
                )}
              </Row>
            </div>
            <div className="pagination-order-tab">
              <Pagination
                onChange={handleChangePag}
                defaultCurrent={selectedPageOrders ? selectedPageOrders : 1}
                total={orders?.TotalPage ? orders?.TotalPage : 1}
                pageSize={6}
              />
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
};
export default Order;
