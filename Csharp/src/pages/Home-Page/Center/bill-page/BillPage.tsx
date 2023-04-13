import React, { useEffect } from "react";
import { Row, Col, MenuProps, Menu } from "antd";
import "./BillPage.scss";
import ContentBillPage from "../../../../components/ContentBillPage/ContentBillPage";
import { useDispatch, useSelector } from "react-redux";
import useAction from "../../../../redux/useActions";
const items: MenuProps["items"] = [
  {
    label: "Tất cả hóa đơn",
    key: "getAllOrder",
  },
  {
    label: "Đã thanh toán",
    key: "getOrderPaid",
  },
  {
    label: "Chờ xác nhận thanh toán",
    key: "getOrderUnpaid",
  },
];
interface DataType {
  key: string;
  timepay: string;
  Id: string;
  table: string;
  customer: string;
  money: Number;
}

const BillPage: React.FC = () => {
  const data: DataType[] = [];
  const dispatch = useDispatch();
  const actions = useAction();
  const selectedStateBill = useSelector(
    (state: any) => state.bill.selectedStateBill
  );
  const orders = useSelector((state: any) => state.bill.billData);
  useEffect(() => {
    dispatch(actions.BillActions.loadData());
  }, [actions.BillActions, dispatch, selectedStateBill]);
  const handleSeletected = (e: any) => {
    dispatch(actions.BillActions.selectedStateBill(e.key));
  };
  if (Array.isArray(orders)) {
    orders.forEach((order) => {
      const date = new Date(order?.TimePay);
      const formattedDate = date.toLocaleDateString("vi-VN");
      //console.log(order.TimePay);
      data.push({
        key: order?.IdOrder,
        timepay: order.TimePay ? formattedDate : "Chưa thanh toán",
        Id: order?.IdOrder,
        table: order.IdTableNavigation?.Name,
        customer: order.IdCustomerNavigation?.Fullname,
        money: order?.payments,
      });
    });
  }
  return (
    <div className="bill-page">
      <Row gutter={[0, 35]}>
        <Col span={24}>
          <div className="title-bill-page">Hóa Đơn</div>
        </Col>
        <Col span={24}>
          <div className="container-bill-page">
            <div className="nav-bill-page">
              <Row>
                <Col span={24}>
                  <Menu
                    className="nav-bill-page"
                    onClick={handleSeletected}
                    selectedKeys={selectedStateBill}
                    mode="horizontal"
                    items={items}
                  />
                </Col>
                <Col span={24}>
                  <div
                    style={{
                      // height: "0.5px",
                      border: "0.5px solid black",
                      opacity: "0.05",
                    }}
                  ></div>
                </Col>
              </Row>
            </div>
            <div className="content-bill-page">
              <ContentBillPage orders={data} />
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
};
export default BillPage;
