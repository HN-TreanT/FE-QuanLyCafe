import React from "react";
import { Row, Col, Menu, MenuProps, Pagination } from "antd";
import { useSelector, useDispatch } from "react-redux";
import useAction from "../../../../redux/useActions";
import "./Product.scss";
let items: MenuProps["items"] = [];

const Product: React.FC = () => {
  const dispatch = useDispatch();
  const actions = useAction();
  const categories = useSelector((state: any) => state.category.categories);
  if (Array.isArray(categories)) {
    items = categories.map((category: any) => {
      return {
        label: category?.Name,
        key: category?.IdCategory,
      };
    });
  }

  return (
    <div className="product">
      <Row gutter={[10, 10]}>
        <Col span={5}>
          <div className="side-bar-poduct-order-page">
            <Menu
              style={{
                fontSize: "1rem",
                backgroundColor: "transparent",
                paddingTop: "10px",
              }}
              mode="inline"
              items={items}
            />
          </div>
        </Col>
        <Col span={19}>
          <div className="content-product-order-page">
            <div className="search-product-order-page">search</div>
            <div className="list-product-order-page">list</div>
            <div className="pagination-proudct-order-page">
              <Pagination defaultCurrent={6} total={500} />
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
};
export default Product;
