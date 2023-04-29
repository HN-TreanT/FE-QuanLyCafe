import { Col, Row, Table, Form, Menu, Input, MenuProps, Modal } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
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
  const loading = useSelector((state: any) => state.state.loadingState);
  const [isOpenModal, setIsOpenModel] = useState(false);
  const [key, setKey] = useState("");
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
  const handleRowClick = (record: any) => {
    dispatch(actions.CategoryActions.setSelectedRow(record.key));
    dispatch(
      actions.StateAction.redirect({
        navigate: navigate,
        path: RouterLinks.DETAIL_CATEGORY,
      })
    );
    dispatch(actions.StateAction.redirectAction());
  };

  const handleDeleteCategory = async (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    record: any
  ) => {
    e.stopPropagation();
    setKey(record.key);
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
      // notification({
      //   message: "delete category fail",
      //   title: "Thông báo",
      //   position: "top-right",
      //   type: "danger",
      // });
      setIsOpenModel(true);
    }
  };
  const handleOKModal = () => {
    console.log("check key,", key);
    dispatch(actions.CategoryActions.setSelectedRow(key));
    dispatch(
      actions.StateAction.redirect({
        navigate: navigate,
        path: RouterLinks.DETAIL_CATEGORY,
      })
    );
    dispatch(actions.StateAction.redirectAction());
    setIsOpenModel(false);
  };
  return (
    <>
      <Modal
        title="Danh mục này còn chứa các mặt hàng"
        open={isOpenModal}
        onCancel={() => {
          setIsOpenModel(false);
        }}
        onOk={handleOKModal}
      >
        <span>Bạn có muốn chuyển đến chuyển danh mục cho các mặt hàng?</span>
      </Modal>
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
              loading={loading}
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
