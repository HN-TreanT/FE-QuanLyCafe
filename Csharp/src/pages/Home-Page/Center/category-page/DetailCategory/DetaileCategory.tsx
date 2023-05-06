import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { ArrowLeftOutlined } from "@ant-design/icons";
import useAction from "../../../../../redux/useActions";
import { useNavigate } from "react-router-dom";
import { RouterLinks } from "../../../../../const";
import ContentDetailCategory from "./ContenDetailCategory";
import "./DetailCategoryPage.scss";
import { serverConfig } from "../../../../../const";
import { Col, Row } from "antd";
import Spinn from "../../../../../components/Spinning/Spinning";
const DetailCategory: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const actions = useAction();
  const categorySelected = useSelector(
    (state: any) => state.category.categorySelected
  );
  const loading = useSelector((state: any) => state.state.loadingState);
  // useEffect(() => {
  //   dispatch(actions.CategoryActions.loadCategoryDetail());
  // }, [dispatch, actions.CategoryActions]);
  let i = 0;
  const products = categorySelected?.Products.map((product: any) => {
    i = i + 1;
    return {
      key: product?.IdProduct,
      image: `${serverConfig.server}/${product?.Thumbnail}`,
      name: `${product?.Title}`,
      index: `${i}`,
      price: `${product?.Price}`,
    };
  });
  console.log(products);
  const handleBack = () => {
    navigate(RouterLinks.CATEGORY_PAGE);
    dispatch(actions.StateAction.selectedMenuItem("category"));
  };
  return (
    <div className="detail-category-page">
      {loading ? <Spinn /> : ""}
      <span onClick={handleBack} style={{ cursor: "pointer", color: "#666" }}>
        <ArrowLeftOutlined style={{ padding: "3px" }} />
        <span>Danh mục</span>
      </span>
      <Row gutter={[0, 15]}>
        <Col span={24}>
          <div className="title-button-detail-category-page">
            <div className="title-detail-category-page">
              {categorySelected?.Name}
            </div>
          </div>
        </Col>
        <ContentDetailCategory value={products} />
      </Row>
    </div>
  );
};
export default DetailCategory;
