import { Col, Row, Table, Form, Menu, Input, MenuProps, Button } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import useAction from "../../../../../redux/useActions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { ColumnsType } from "antd/es/table";
import { useNavigate } from "react-router-dom";
import { RouterLinks } from "../../../../../const";
import { CategorySupport } from "../../../../../const/CategorySupport";
import { categoryService } from "../../../../../untils/networks/services/categoryService";
import { notification } from "../../../../../components/notification";
import "./ContenCategoryPage.scss";
const items: MenuProps["items"] = [
  {
    label: "Tất cả danh mục",
    key: "listCategory",
  },
];
interface DataType {
  nameCategory: string;
  count: Number;
}

const ContentCategoryPage: React.FC<any> = ({ value }) => {
  const navigate = useNavigate();
  const actions = useAction();
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const columns: ColumnsType<DataType> = [
    {
      title: "Danh mục",
      dataIndex: "nameCategory",
    },
    {
      title: "Số lượng mặt hàng",
      dataIndex: "count",
    },
    {
      title: "",
      dataIndex: "deleteCategory",
      render: (text: any, record: DataType) => (
        <div
          onClick={(e) => handleDeleteCategory(e, record)}
          className="table-delete"
          style={{ cursor: "pointer" }}
        >
          X
        </div>
      ),
    },
  ];
  const [valueCategories, setValueCategories] = useState(value);
  useEffect(() => {
    setValueCategories(value);
  }, [value]);
  const handleValueFormChange = () => {};
  const handleSearchValueChange = (e: any) => {
    const a = CategorySupport.SearchCategory({
      categories: value,
      searchValue: form.getFieldsValue().searchValue,
    });
    if (form.getFieldsValue().searchValue) {
      setValueCategories(a);
    } else {
      setValueCategories(value);
    }
  };
  const handleRowClick = async (record: any) => {
    console.log(record.key);
    try {
      const category = await categoryService.getCateroryById(record.key);
      if ((category.Status = true)) {
        dispatch(actions.CategoryActions.categorySelected(category.Data));
        navigate(RouterLinks.DETAIL_CATEGORY);
      } else {
        notification({
          message: "Not found ca  tegory",
          title: "Thông báo",
          position: "top-right",
          type: "danger",
        });
      }
    } catch (err: any) {
      console.log(err.Message);
    }
  };
  const handleDeleteCategory = async (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    record: any
  ) => {
    e.stopPropagation();
    try {
      const response = await categoryService.deleteCategory(record.key);
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
    <>
      <Col span={24}>
        <div className="container-category-page">
          <div className="header-category-page">
            <Row>
              <Col span={24}>
                <Menu
                  selectedKeys={["listCategory"]}
                  mode="horizontal"
                  items={items}
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
              <Col span={24}>
                <Form
                  form={form}
                  layout="horizontal"
                  onValuesChange={handleValueFormChange}
                  className="form-css"
                >
                  <Form.Item
                    name="searchValue"
                    className="input-search-category"
                  >
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
                  </Form.Item>
                </Form>
              </Col>
            </Row>
          </div>
          <div className="content-category-page">
            <Table
              style={{ marginLeft: "20px" }}
              columns={columns}
              dataSource={valueCategories}
              pagination={{
                pageSize: 5,
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
export default ContentCategoryPage;
