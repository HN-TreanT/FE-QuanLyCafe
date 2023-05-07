import React from "react";
import { Tabs } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUtensils,
  faFileInvoiceDollar,
  faLocationDot,
} from "@fortawesome/free-solid-svg-icons";
import TableLocation from "./TableLocation/TableLocation";
import Order from "./Order/Order";
import Product from "./Product/Product";

const items = [
  {
    label: "Hóa đơn",
    key: "allOrder",
    children: <Order />,
    icon: faFileInvoiceDollar,
  },
  {
    label: "Vị trí",
    key: "location",
    children: <TableLocation />,
    icon: faLocationDot,
  },
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
  const onChange = (key: string) => {
    console.log(key);
  };
  return (
    <div className="operation-order-page">
      <Tabs onChange={onChange} defaultActiveKey="allOrder">
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
