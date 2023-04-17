import React from "react";
import "./ItemDetailOrder.scss";
import { Col, Row } from "antd";
interface Props {
  NameProduct: string;
  Amount: string;
  Price: string;
}
const ItemOrderDetail: React.FC<Props> = (data) => {
  return (
    <>
      <Col span={12}>{data.NameProduct}</Col>
      <Col span={6}>{`${data.Amount}`}</Col>
      <Col span={6}>{data.Price}</Col>
    </>
  );
};
export default ItemOrderDetail;
