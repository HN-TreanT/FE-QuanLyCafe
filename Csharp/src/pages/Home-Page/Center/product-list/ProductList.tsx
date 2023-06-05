import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col, Button, Menu, MenuProps, Form, Input } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass, faPlus, faFileExcel } from "@fortawesome/free-solid-svg-icons";
import "./ProductList.scss";
import useAction from "../../../../redux/useActions";
import { RouterLinks, serverConfig } from "../../../../const";
import { useNavigate } from "react-router-dom";
import ContenProductList from "../../../../components/ContentProductList/ContentProductList";
import useDebounce from "../../../../hooks/useDebounce";
import * as XLSX from "xlsx";
import * as FileSaver from "file-saver";
import { productServices } from "../../../../untils/networks/services/productService";
import { notification } from "../../../../components/notification";
import { VND } from "../../../../const/convertVND";
import moment from "moment";
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
        price: product?.Price ? VND.format(product.Price) : "0 đ",
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
  const handleExport = async () => {
    let response = await productServices.GetTop5Product(360);
    if (response.Status) {
      if (response.Data && Array.isArray(response.Data)) {
        const data = response.Data.map((product: any) => {
          return {
            "Mã mặt hàng": product?.IdProduct,
            "Tên mặt hàng": product?.Title,
            "Số lượng đã bán": product?.TotalAmount,
            "Doanh thu": VND.format(product?.Price),
          };
        });
        const workbook = XLSX.utils.book_new();
        const headerTitle = "Top 5 sản phẩm bán chạy trong năm";
        //sheet1
        const sheet = XLSX.utils.json_to_sheet([{}], {
          header: [headerTitle],
        });
        const columnWidths = [{ wch: 20 }, { wch: 30 }, { wch: 20 }, { wch: 20 }];
        const ws = XLSX.utils.sheet_add_json(sheet, data, { origin: "A3" });
        ws["!cols"] = columnWidths;
        // XLSX.utils.sheet_add_json(sheet, data, { origin: "A10" });
        XLSX.utils.book_append_sheet(workbook, sheet);
        const today = moment();
        const formatToday = today.format("DD/MM/YYYY");
        XLSX.writeFile(workbook, `Baocao-${formatToday}.xls`);
      }
    } else {
      notification({
        message: "Xuất báo cáo lỗi",
        title: "Thông báo",
        position: "top-right",
        type: "danger",
      });
    }
  };
  return (
    <div className="product-page">
      <Row gutter={[0, 15]}>
        <Col span={24}>
          <div className="title-button-product-page">
            <div className="title-product-page">Danh sách mặt hàng</div>

            <div>
              <Button
                onClick={handleClickButtonAddProduct}
                type="primary"
                className="button-add-product"
              >
                <FontAwesomeIcon icon={faPlus} />
                <span> Thêm mặt hàng</span>
              </Button>
              <Button
                style={{ marginLeft: "20px", color: "green", border: "1px solid green" }}
                onClick={handleExport}
              >
                <FontAwesomeIcon icon={faFileExcel} fontSize={20} style={{ paddingRight: "5px" }} />
                Báo cáo
              </Button>
            </div>
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
