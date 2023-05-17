import React from "react";
import { Tabs } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUtensils,
  faFileInvoiceDollar,
  faLocationDot,
} from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import useAction from "../../../redux/useActions";
import TableLocation from "./TableLocation/TableLocation";
import Order from "./Order/Order";
import Product from "./Product/Product";

const items = [
  {
    label: "Phiếu yêu cầu",
    key: "allOrder",
    children: <Order />,
    icon: faFileInvoiceDollar,
  },
  // {
  //   label: "Vị trí",
  //   key: "location",
  //   children: <TableLocation />,
  //   icon: faLocationDot,
  // },
  {
    label: "Mặt hàng",
    key: "product",
    children: <Product />,
    icon: faUtensils,
  },
];

const IconTab = ({ icon, label, children }: any) => (
  <div>
    <FontAwesomeIcon
      style={{ paddingRight: "6px", fontSize: "1rem" }}
      icon={icon}
    />
    <span>{label}</span>
    {children}
  </div>
);
const OperationOrderPage: React.FC = () => {
  const dispatch = useDispatch();
  const actions = useAction();
  const selectedPage = useSelector(
    (state: any) => state.orderpage.selectedPageOrderProductTable
  );
  React.useEffect(() => {
    if (selectedPage === "allOrder") {
      dispatch(actions.OrderPageActions.loadOrders());
    }
    // if (selectedPage === "location") {
    //   dispatch(actions.OrderPageActions.loadTable());
    // }
    if (selectedPage === "product") {
      dispatch(actions.OrderPageActions.loadProduct());
    }
  }, [actions.OrderPageActions, dispatch, selectedPage]);

  const onChange = (key: string) => {
    dispatch(actions.OrderPageActions.setPageOrderProductTable(key));
  };
  return (
    <div className="operation-order-page">
      <Tabs
        onChange={onChange}
        // defaultActiveKey={selectedPage ? selectedPage : "allOrder"}
        activeKey={selectedPage ? selectedPage : "allOrder"}
      >
        {items.map((item) => (
          <Tabs.TabPane
            tab={<IconTab icon={item.icon} label={item.label} />}
            key={item.key}
            className="tab-pane"
          >
            {item.children}
          </Tabs.TabPane>
        ))}
      </Tabs>
    </div>
  );
};
export default OperationOrderPage;
