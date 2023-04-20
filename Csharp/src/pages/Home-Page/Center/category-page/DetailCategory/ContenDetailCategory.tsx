import React, { useState } from "react";
import { Col, Row, Input, Table, Image, Button } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass, faTrash } from "@fortawesome/free-solid-svg-icons";
import { ColumnsType } from "antd/es/table";
import removeAccents from "../../../../../const/RemoveAccent";
import { productServices } from "../../../../../untils/networks/services/productService";
import useAction from "../../../../../redux/useActions";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RouterLinks } from "../../../../../const";
import { notification } from "../../../../../components/notification";
import { categoryService } from "../../../../../untils/networks/services/categoryService";
interface DataType {
  key: any;
  image: string;
  name: string;
  price: Number;
  index: Number;
  close: any;
}
const ContentDetailCategory: React.FC<any> = ({ value }) => {
  const actions = useAction();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const categorySelected = useSelector(
    (state: any) => state.category.categorySelected
  );
  console.log(categorySelected);
  const columns: ColumnsType<DataType> = [
    {
      title: "",
      dataIndex: "index",
      width: "10%",
    },
    {
      title: "Mặt hàng",
      dataIndex: "image",
      width: "10%",
      render: (text) => (
        <Image src={text} preview={false} width={80} height={60} />
      ),
    },
    {
      title: "",
      dataIndex: "name",
      width: "20%",
      render: (text) => <div style={{ color: "#1677ff" }}>{text}</div>,
    },
    {
      title: "Giá thành",
      width: "40%",
      dataIndex: "price",
      render: (text) => <div style={{ color: "#1677ff" }}>{text}</div>,
    },
    {
      title: "",
      dataIndex: "index",
      width: "10%",
      render: (text) => <span>X</span>,
    },
  ];
  const [products, setProducts] = useState(value);
  const handleSearchValueChange = (e: any) => {
    let filterProducts: any[] = [];
    filterProducts = value.filter((v: any) => {
      const searchValue = removeAccents(e.target.value).toLocaleLowerCase();
      const nameProduct = removeAccents(v?.name).toLocaleLowerCase();
      return nameProduct.includes(searchValue);
    });
    if (e.target.value) {
      setProducts(filterProducts);
    } else {
      setProducts(value);
    }
  };
  const handleRowClick = async (record: any) => {
    console.log(record.key);
    const dbProduct = await productServices.GetProductById(record.key);
    dispatch(actions.MaterialActions.loadData());
    if (dbProduct.Status) {
      dispatch(
        actions.MaterialActions.selectedMaterial(
          Array.isArray(dbProduct.Data.UseMaterials) &&
            dbProduct.Data.UseMaterials.map((item: any) => {
              return {
                ...item.IdMaterialNavigation,
                Amount: item.Amount,
              };
            })
        )
      );
      dispatch(
        actions.ProductActions.setSelectedProductId(dbProduct.Data?.IdProduct)
      );
      dispatch(actions.ProductActions.setInfoProduct(dbProduct.Data));
      navigate(RouterLinks.UPDATE_PRODUCT_PAGE);
    } else {
      notification({
        message: "get product by id fail",
        title: "Thông báo",
        position: "top-right",
        type: "danger",
      });
    }
  };
  const handleDeleteCategory = async () => {
    try {
      const response = await categoryService.deleteCategory(
        categorySelected?.IdCategory
      );
      if (response.Status) {
        dispatch(actions.CategoryActions.loadData());
        navigate(RouterLinks.CATEGORY_PAGE);
      } else {
        notification({
          message: "delete category fail",
          title: "Thông báo",
          position: "top-right",
          type: "danger",
        });
      }
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <Col span={24}>
      <div className="container-detail-category-page">
        <div className="content-detail-category-page">
          <div className="header-detail-category-page">
            <Row gutter={[15, 15]}>
              <Col span={21}>
                <span className="title">Danh sách mặt hàng</span>
              </Col>
              <Col span={3}>
                <Button danger onClick={handleDeleteCategory}>
                  <FontAwesomeIcon
                    style={{ marginRight: "5px" }}
                    icon={faTrash}
                  />
                  Xóa danh mục
                </Button>
              </Col>
              <Col span={24}>
                <Input
                  onChange={handleSearchValueChange}
                  placeholder="Nhập giá trị muốn tìm kiếm theo loại"
                  prefix={
                    <FontAwesomeIcon
                      icon={faMagnifyingGlass}
                      className="icon-search"
                    />
                  }
                />
              </Col>
              <Col span={24}>
                <div
                  style={{
                    border: "0.5px solid black",
                    opacity: "0.05",
                  }}
                ></div>
              </Col>
            </Row>
          </div>
          <div className="table-detail-category-page">
            <Table
              style={{ marginLeft: "20px" }}
              columns={columns}
              dataSource={products}
              pagination={{
                pageSize: 3,
                showSizeChanger: false,
                hideOnSinglePage: true,
              }}
              onRow={(record: DataType) => ({
                onClick: () => handleRowClick(record),
              })}
            />
          </div>
        </div>
      </div>
    </Col>
  );
};
export default ContentDetailCategory;
