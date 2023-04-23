import React, { useEffect, useState, useLayoutEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col, Button } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import "./ProductList.scss";
import Spin from "../../../../components/Spinning/Spinning";
import useAction from "../../../../redux/useActions";
import { RouterLinks, serverConfig } from "../../../../const";
import { useNavigate } from "react-router-dom";
import ContenProductList from "../../../../components/ContentProductList/ContentProductList";

const ProductList: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const actions = useAction();
  useEffect(() => {
    dispatch(actions.ProductActions.loadData());
  }, [actions.ProductActions, dispatch]);
  const products = useSelector((state: any) => state.product.products);
  const valueProducts = products.map((product: any) => {
    const pathImg = `${serverConfig.server}/public/${product.Thumbnail}`;
    return {
      key: product?.IdProduct,
      pathImage: pathImg,
      Id: product?.IdProduct,
      productName: product?.Title,
      category: product.IdCategoryNavigation?.Name,
      price: product?.Price,
    };
  });
  const handleClickButtonAddProduct = () => {
    dispatch(actions.MaterialActions.selectedMaterial([]));
    dispatch(actions.MaterialActions.loadData());
    navigate(RouterLinks.ADD_PRODUCT_PAGE);
  };
  return (
    <div className="product-page">
      <Row gutter={[0, 15]}>
        <Col span={24}>
          <div className="title-button-product-page">
            <div className="title-product-page">Danh sách mặt hàng</div>
            <Button
              onClick={handleClickButtonAddProduct}
              type="primary"
              className="button-add-product"
            >
              <FontAwesomeIcon icon={faPlus} />
              <span> Thêm mặt hàng</span>
            </Button>
          </div>
        </Col>
        <ContenProductList value={valueProducts} />
      </Row>
    </div>
  );
};
export default ProductList;
