import React, { useEffect, useState, useLayoutEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col, Button, Menu, MenuProps, Form, Input } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass, faPlus } from "@fortawesome/free-solid-svg-icons";
import "./ProductList.scss";
import Spin from "../../../../components/Spinning/Spinning";
import useAction from "../../../../redux/useActions";
import { RouterLinks, serverConfig } from "../../../../const";
import { useNavigate } from "react-router-dom";
import ContenProductList from "../../../../components/ContentProductList/ContentProductList";
import useDebounce from "../../../../hooks/useDebounce";
import * as XLSX from "xlsx";
import * as FileSaver from "file-saver";
const items: MenuProps["items"] = [
  {
    label: "Tất cả mặt hàng",
    key: "listProduct",
  },
];
const ProductList: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const actions = useAction();
  const selectedPage = useSelector((state: any) => state.product.selectedPage);
  const [searchValue, setSearchValue] = useState("");
  const searchValueDebounce = useDebounce<string>(searchValue, 500);

  useEffect(() => {
    dispatch(actions.ProductActions.setSearchValue(searchValueDebounce));
    dispatch(actions.ProductActions.loadData());
  }, [actions.ProductActions, dispatch, selectedPage, searchValueDebounce]);
  const products = useSelector((state: any) => state.product.products);
  let valueProducts: any[] = [];
  if (Array.isArray(products?.Data)) {
    valueProducts = products?.Data.map((product: any) => {
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
  }
  const handleClickButtonAddProduct = () => {
    dispatch(
      actions.MaterialActions.selectedMaterial({
        selectedRowKeys: [],
        selectedRows: [],
      })
    );

    dispatch(actions.MaterialActions.selectedMaterial([]));
    navigate(RouterLinks.ADD_PRODUCT_PAGE);
  };
  //tìm kiếm
  const handleChangeNameProduct = (e: any) => {
    dispatch(actions.ProductActions.setSelectedPage(1));
    dispatch(actions.ProductActions.setTypeSeacrch("nameProduct"));
    setSearchValue(e.target.value);
  };
  const handleSearchCategory = (e: any) => {
    dispatch(actions.ProductActions.setSelectedPage(1));
    dispatch(actions.ProductActions.setTypeSeacrch("category"));
    setSearchValue(e.target.value);
  };
  const handleExport = () => {
    const fileType =
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
    const fileExtension = ".xlsx";
    const ws = XLSX.utils.json_to_sheet(valueProducts);
    const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const data = new Blob([excelBuffer], { type: fileType });
    FileSaver.saveAs(data, "mysheet" + fileExtension);
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
            <Button onClick={handleExport}>Export</Button>
          </div>
        </Col>
        <Col span={24}>
          <div className="container-product-page">
            <div className="header-product-page">
              <Row>
                <Col span={24}>
                  <Menu selectedKeys={["listProduct"]} mode="horizontal" items={items} />
                </Col>
                <Col span={24}>
                  <div
                    style={{
                      // height: "0.5px",
                      border: "0.5px solid black",
                      opacity: "0.05",
                    }}
                  ></div>
                </Col>
                <Col span={24}>
                  <Form form={form} className="form-css">
                    <Row gutter={[30, 20]}>
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
                            onChange={handleChangeNameProduct}
                            prefix={
                              <FontAwesomeIcon icon={faMagnifyingGlass} className="icon-search" />
                            }
                          />
                        </Form.Item>
                      </Col>
                      <Col span={8}>
                        <Form.Item
                          name="time"
                          className="input-search-import-warehouse input-label-inline-border"
                        >
                          <label className="ant-form-item-label" htmlFor="">
                            Nhập danh mục
                          </label>
                          <Input
                            onChange={handleSearchCategory}
                            bordered={false}
                            placeholder="Nhập tên danh mục"
                            prefix={
                              <FontAwesomeIcon icon={faMagnifyingGlass} className="icon-search" />
                            }
                          />
                        </Form.Item>
                      </Col>
                    </Row>
                  </Form>
                </Col>
              </Row>
            </div>
            <ContenProductList value={valueProducts} total={products.TotalPage} />
          </div>
        </Col>
      </Row>
    </div>
  );
};
export default ProductList;
