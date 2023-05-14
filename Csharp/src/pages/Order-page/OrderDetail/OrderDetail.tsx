import React, { useRef, useState } from "react";
import { Tabs } from "antd";
import ContentOrderDetail from "./ContentOrderDetail/ContentOrderDetail";
import { billServices } from "../../../untils/networks/services/billService";
import { useDispatch, useSelector } from "react-redux";
import useAction from "../../../redux/useActions";

let initialItems = [
  { label: "new tab", children: <ContentOrderDetail />, key: "1" },
];

const OrderDetail: React.FC = () => {
  const dispatch = useDispatch();
  const actions = useAction();
  const [items, setItems] = useState(initialItems);
  const selectedOrder = useSelector(
    (state: any) => state.orderpage.selectedOrder
  );
  React.useEffect(() => {
    setItems([
      {
        label: selectedOrder?.IdOrder
          ? `Đơn #${selectedOrder?.IdOrder}`
          : "new order",
        children: <ContentOrderDetail />,
        key: "1",
      },
    ]);
  }, [selectedOrder?.IdOrder]);
  const onChange = (key: string) => {
    //console.log(key);
  };
  const onEdit = async () => {
    dispatch(actions.OrderPageActions.createOrder());
  };
  return (
    <div className="order-detail">
      <Tabs
        type="editable-card"
        onChange={onChange}
        items={items}
        onEdit={onEdit}
      />
    </div>
  );
};

export default OrderDetail;
