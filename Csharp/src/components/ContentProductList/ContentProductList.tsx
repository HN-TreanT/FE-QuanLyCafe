import {
  Col,
  Row,
  Table,
  Form,
  Menu,
  Select,
  Input,
  MenuProps,
  Button,
  Image,
} from "antd";
import React, { useEffect, useState } from "react";
import { ProductSupport } from "../../const/ProductSupport";
import { useDispatch, useSelector } from "react-redux";
import useAction from "../../redux/useActions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faTrash } from "@fortawesome/free-solid-svg-icons";
import { ColumnsType } from "antd/es/table";
const items: MenuProps["items"] = [
  {
    label: "Tất cả mặt hàng",
    key: "listProduct",
  },
];
interface DataType {
  key: string;
  pathImage: string;
  productName: string;
  Id: string;
  category: string;
  price: Number;
}
const ContenProductList: React.FC<any> = ({ value }) => {
  const [form] = Form.useForm();
  const columns: ColumnsType<DataType> = [
    {
      title: "",
      dataIndex: "pathImage",
      render: (text) => (
        <Image src={text} preview={false} width={80} height={60} />
      ),
    },
    {
      title: "Tên mặt hàng",
      dataIndex: "productName",
    },
    {
      title: "Mã tham chiếu",
      dataIndex: "Id",
      render: (text) => <div style={{ color: "#1677ff" }}>{text}</div>,
    },
    {
      title: "Danh mục",
      dataIndex: "category",
    },
    {
      title: "Giá thành",
      dataIndex: "price",
    },
    {
      title: "",
      dataIndex: "key",
      render: (text: any) => (
        <div>
          <Button
            onClick={() => handleClickEdit(text)}
            type="primary"
            ghost
            style={{ marginRight: "10px" }}
          >
            <FontAwesomeIcon
              icon={faPen}
              // style={{ marginRight: "5px" }}
              bounce
              className="icon-button-product"
            />
            <span>Chính sửa</span>
          </Button>
          <Button onClick={() => handleClickDelete(text)} danger>
            <FontAwesomeIcon
              icon={faTrash}
              //    style={{ marginRight: "5px" }}
              bounce
              className="icon-button-product"
            />
            <span>Xóa</span>
          </Button>
        </div>
      ),
    },
  ];
  const dispatch = useDispatch();
  const actions = useAction();
  const [valueProducts, setValueProducts] = useState(value);
  useEffect(() => {
    setValueProducts(value);
  }, [value]);
  //click row table
  const handleRowClick = (record: any) => {};
  //chỉnh sửa
  const handleClickEdit = (Id: any) => {
    console.log("edit", Id);
  };
  //xóa
  const handleClickDelete = async (key: any) => {
    dispatch(actions.ProductActions.deleteProduct(key));
  };

  //tìm kiếm
  const handleSearchValueChange = (e: any) => {
    const a = ProductSupport.SearchProduct({
      ...form.getFieldsValue(),
      products: value,
    });
    if (form.getFieldsValue().searchValue) {
      setValueProducts(a);
    } else {
      setValueProducts(value);
    }
  };
  const handleValueFormChange = () => {};
  return (
    <>
      <Col span={24}>
        <div className="container-product-page">
          <div className="header-product-page">
            <Row>
              <Col span={24}>
                <Menu
                  selectedKeys={["listProduct"]}
                  mode="horizontal"
                  items={items}
                />
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
                <Form
                  form={form}
                  layout="horizontal"
                  onValuesChange={handleValueFormChange}
                  className="form-css"
                >
                  <Form.Item
                    initialValue={"nameProduct"}
                    name="selectedTypeSearch"
                    className="type-search-product"
                  >
                    <Select
                      options={[
                        { value: "nameProduct", label: "Tên mặt hàng" },
                        { value: "category", label: "Mặt hàng" },
                      ]}
                    />
                  </Form.Item>
                  <Form.Item
                    name="searchValue"
                    className="input-search-product"
                  >
                    <Input.Search
                      onChange={handleSearchValueChange}
                      placeholder="Nhập giá trị muốn tìm kiếm theo loại"
                    />
                  </Form.Item>
                </Form>
              </Col>
            </Row>
          </div>
          <div className="content-product-page">
            <Table
              style={{ marginLeft: "20px" }}
              columns={columns}
              dataSource={valueProducts}
              pagination={{
                pageSize: 4,
                showSizeChanger: false,
                hideOnSinglePage: true,
              }}
              onRow={(record: DataType) => ({
                onClick: () => handleRowClick(record),
              })}
            />
          </div>
        </div>
      </Col>
    </>
  );
};
export default ContenProductList;