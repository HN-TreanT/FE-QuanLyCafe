import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col, Button, Modal, Input, Form } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import "./CategoryPage.scss";
import ContentCategoryPage from "./ContentCategoryPage/ContenCategoryPage";
import useAction from "../../../../redux/useActions";
import { categoryService } from "../../../../untils/networks/services/categoryService";
import { notification } from "../../../../components/notification";
import Spinn from "../../../../components/Spinning/Spinning";

const CategoryPage: React.FC = () => {
  const [form] = Form.useForm();
  const actions = useAction();
  const dispatch = useDispatch();
  const [isOpenModel, setIsOpenModel] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const [valueAddCategory, setValueAddCategory] = useState("");
  const categories = useSelector((state: any) => state.category.categories);
  useEffect(() => {
    dispatch(actions.CategoryActions.loadData());
  }, [dispatch, actions.CategoryActions]);
  const valueCategories = categories.map((category: any) => {
    return {
      key: category?.IdCategory,
      nameCategory: category?.Name,
      count: category?.Products.length,
    };
  });
  const handleClickButtonAddProduct = () => {
    setIsOpenModel(true);
  };
  const handleAddCategory = async () => {
    try {
      const category = await categoryService.createCategory({
        Name: valueAddCategory,
      });
      if (category.Status) {
        dispatch(actions.CategoryActions.loadData());
        setIsOpenModel(false);
        form.resetFields();
        notification({
          message: "create success",
          title: "Thông báo",
          position: "top-right",
          type: "success",
        });
      } else {
        notification({
          message: "create fail",
          title: "Thông báo",
          position: "top-right",
          type: "danger",
        });
        form.resetFields();
        setIsOpenModel(false);
      }
    } catch (err: any) {
      notification({
        message: err.message,
        title: "Thông báo",
        position: "top-right",
        type: "danger",
      });
      form.resetFields();
      setIsOpenModel(false);
    }
  };
  return (
    <div className="category-page">
      <Modal
        title="Thêm danh mục"
        open={isOpenModel}
        onCancel={() => {
          setIsOpenModel(false);
          form.resetFields();
        }}
        footer={[
          <Button
            key="back"
            onClick={() => {
              setIsOpenModel(false);
              form.resetFields();
            }}
          >
            Hủy
          </Button>,
          <Button
            disabled={disabled}
            key="submit"
            type="primary"
            onClick={handleAddCategory}
          >
            Thêm
          </Button>,
        ]}
        className="modal-style"
      >
        <div>
          <div style={{ paddingBottom: "5px" }}>Tên danh mục</div>
          <Form form={form}>
            <Form.Item name="NameCategory">
              <Input
                onChange={(e: any) => {
                  setValueAddCategory(e.target.value);
                  if (
                    form.getFieldsValue()?.NameCategory !== "" &&
                    form.getFieldsValue()?.NameCategory
                  ) {
                    setDisabled(false);
                  } else {
                    setDisabled(true);
                  }
                }}
              ></Input>
            </Form.Item>
          </Form>
        </div>
      </Modal>
      <Row gutter={[0, 15]}>
        <Col span={24}>
          <div className="title-button-category-page">
            <div className="title-category-page">Danh mục</div>
            <Button
              onClick={handleClickButtonAddProduct}
              type="primary"
              className="button-add-category"
            >
              <FontAwesomeIcon icon={faPlus} />
              <span> Thêm danh mục</span>
            </Button>
          </div>
        </Col>
        <ContentCategoryPage value={valueCategories} />
      </Row>
    </div>
  );
};
export default CategoryPage;
