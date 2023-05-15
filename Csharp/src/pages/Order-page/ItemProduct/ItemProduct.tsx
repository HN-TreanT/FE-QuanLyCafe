import React from "react";
import { Image } from "antd";
import { useDispatch, useSelector } from "react-redux";
import useAction from "../../../redux/useActions";
import "./ItemProduct.scss";
import { serverConfig } from "../../../const/severConfig";

const ItemProduct: React.FC<any> = ({ product }) => {
  const actions = useAction();
  const dispatch = useDispatch();

  const url = `${serverConfig.server}/public/${product.Thumbnail}`;
  const handleClickProduct = (product: any) => {
    console.log("check product:", product);
  };
  return (
    <div
      onClick={() => handleClickProduct(product)}
      className="card-image-product"
    >
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
