import React, { useEffect, useState } from "react";
import { Row, Col, Menu, MenuProps, Pagination, Form, Input } from "antd";
import { useSelector, useDispatch } from "react-redux";
import useAction from "../../../../redux/useActions";
import "./Product.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMagnifyingGlass,
  faUtensils,
} from "@fortawesome/free-solid-svg-icons";
import ItemProduct from "../../ItemProduct/ItemProduct";
import Spinn from "../../../../components/Spinning/Spinning";
import useDebounce from "../../../../hooks/useDebounce";
let items: MenuProps["items"] = [
  { label: "Tất cà mặt hàng", key: "allProduct" },
];

const Product: React.FC = () => {
  const dispatch = useDispatch();
  const actions = useAction();
  const products = useSelector((state: any) => state.orderpage.products);
  const loading = useSelector((state: any) => state.state.loadingState);
  const selectedPageProduct = useSelector(
    (state: any) => state.orderpage.selectedPageProduct
  );
  const selectedCategory = useSelector(
    (state: any) => state.orderpage.selectedCategory
  );
  const [searchValue, setSearchValue] = useState("");
  const searchValueDebounce = useDebounce<string>(searchValue, 500);
  useEffect(() => {
    dispatch(actions.OrderPageActions.setSearchValue(searchValueDebounce));
    dispatch(actions.CategoryActions.loadData());
    dispatch(actions.OrderPageActions.loadProduct());
  }, [
    dispatch,
    actions.CategoryActions,
    actions.OrderPageActions,
    selectedPageProduct,
    selectedCategory,
    searchValueDebounce,
  ]);
  const categories = useSelector((state: any) => state.category.categories);
  if (Array.isArray(categories)) {
    items = categories.map((category: any) => {
      return {
        label: category?.Name,
        key: category?.IdCategory,
      };
    });
  }
  items?.unshift({ label: "Tất cả mặt hàng", key: "allProduct" });
  const handleSelectedPageProduct = (e: any) => {
    dispatch(actions.OrderPageActions.setSelectedPageProduct(e));
  };
  const handleChangeCategory = (e: any) => {
    dispatch(actions.OrderPageActions.setSelectedCategory(e.key));
  };
  const handleSearchNameProduct = (e: any) => {
    setSearchValue(e.target.value);
  };
  return (
    <div className="product">
      <Row gutter={[10, 10]}>
        <Col span={5}>
          <div className="side-bar-poduct-order-page">
            <Menu
              selectedKeys={selectedCategory ? selectedCategory : "allProduct"}
              onClick={handleChangeCategory}
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
            {loading ? <Spinn /> : ""}
            <div className="search-product-order-page">
              <Form style={{ marginTop: "15px" }}>
                <Row gutter={[30, 0]}>
                  <Col span={8}>
                    <Form.Item
                      name="Id"
                      className="input-search-import-warehouse input-label-inline-border"
                    >
                      <label className="ant-form-item-label" htmlFor="">
                        Tên mặt hàng
                      </label>
                      <Input
                        bordered={false}
                        placeholder="Nhập tên mặt hàng"
                        onChange={handleSearchNameProduct}
                        prefix={
                          <FontAwesomeIcon
                            //  onClick={handleClickSearchId}
                            icon={faMagnifyingGlass}
                            className="icon-search"
                          />
                        }
                      />
                    </Form.Item>
                  </Col>
                </Row>
              </Form>
            </div>
            <div className="list-product-order-page">
              {loading ? <Spinn /> : ""}
              <Row gutter={[10, 15]}>
                {Array.isArray(products?.Data) && products?.Data.length ? (
                  products.Data.map((product: any) => {
                    return (
                      <Col key={product?.IdProduct} span={6}>
                        {" "}
                        <ItemProduct product={product} />
                      </Col>
                    );
                  })
                ) : (
                  <div className="empty-product">
                    <FontAwesomeIcon
                      icon={faUtensils}
                      className="icon-empty-product"
                    />
                    <div className="title-empy-product">
                      Không có mặt hàng nào
                    </div>
                  </div>
                )}
              </Row>
            </div>
            <div className="pagination-proudct-order-page">
              <Pagination
                onChange={handleSelectedPageProduct}
                defaultCurrent={selectedPageProduct ? selectedPageProduct : 1}
                total={products?.TotalPage}
                pageSize={12}
              />
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
};
export default Product;
