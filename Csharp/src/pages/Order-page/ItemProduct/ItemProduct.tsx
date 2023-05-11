import React from "react";
import { Card, Image } from "antd";
import image from "../../../assets/dinning-table.png";
import "./ItemProduct.scss";
import { serverConfig } from "../../../const/severConfig";

const ItemProduct: React.FC<any> = ({ product }) => {
  const url = `${serverConfig.server}/public/${product.Thumbnail}`;
  return (
    <div className="card-image-product">
      <Image
        className="image-card-image-product"
        preview={false}
        width={140}
        height={100}
        src={url}
      ></Image>
      <div style={{ fontWeight: "600" }}>{product?.Title}</div>
    </div>
  );
};

export default ItemProduct;
