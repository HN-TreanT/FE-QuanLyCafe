import "./UpdateProductPage.scss";
import React, { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import {
  Form,
  Row,
  Col,
  Input,
  Select,
  Upload,
  Modal,
  Button,
  InputNumber,
} from "antd";
import { useDispatch, useSelector } from "react-redux";
import useAction from "../../../../../redux/useActions";
import { PlusOutlined } from "@ant-design/icons";
import ImgCrop from "antd-img-crop";
import type { RcFile, UploadFile } from "antd/es/upload/interface";
import ModalAddMaterial from "../../../../../components/ModalAddMaterial/ModalAddMaterial";
import { RouterLinks, serverConfig } from "../../../../../const";

const UpdateProductPage: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const actions = useAction();
  const [form] = Form.useForm();
  const [isOpenModal, setIsOpenModal] = useState(false);
  const infoProduct = useSelector((state: any) => state.product.infoProduct);
  let category: any[] = [];
  useEffect(() => {
    dispatch(actions.CategoryActions.loadData());
  }, [dispatch, actions.CategoryActions]);
  const selectedMaterials = useSelector(
    (state: any) => state.material.selectedMaterials
  );
  const categories = useSelector((state: any) => state.category.categories);
  category = categories.map((category: any) => {
    return {
      value: category.IdCategory,
      label: category.Name,
    };
  });

  //xử lý file ///////////////

  const [file, setFile] = useState<any>();
  const [fileUrl, setFileUrl] = useState("");
  const handleUpload = (uploadFile: any): boolean => {
    setFileUrl(URL.createObjectURL(uploadFile));
    return false;
  };
  const handlePreview = async (file: UploadFile) => {
    let src = file.url as string;
    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj as RcFile);
        reader.onload = () => resolve(reader.result as string);
      });
    }
    const image = new Image();
    image.src = src;
    const imgWindow = window.open(src);
    imgWindow?.document.write(image.outerHTML);
  };

  /////////////////////////////////////////
  const handleChange = () => {
    //console.log(file);
    //console.log(form.getFieldsValue());
    let data: any[] = [];
    let formData = new FormData();
    console.log(form.getFieldsValue());
    formData.append("file", file);
    formData.append("Description", form.getFieldsValue().Description);
    formData.append("Price", form.getFieldsValue().Price);
    formData.append("Unit", form.getFieldsValue().Unit);
    formData.append("Title", form.getFieldsValue().Title);
    formData.append("IdCategory", form.getFieldsValue().category);
    data = Array.isArray(selectedMaterials)
      ? selectedMaterials.map((selectedMaterial: any) => {
          return {
            IdMaterial: selectedMaterial.IdMaterial,
            Amount: form.getFieldsValue([
              `amount${selectedMaterial.IdMaterial}`,
            ])[`amount${selectedMaterial.IdMaterial}`],
          };
        })
      : [];
    // setData(data);
    dispatch(actions.MaterialActions.infoUseMaterial(data));
    dispatch(actions.ProductActions.setInfoProduct(formData));
  };
  const handleChangeFile = (e: any) => {
    setFile(e.file);
  };
  const handleClickAddMaterial = (e: any) => {
    dispatch(actions.MaterialActions.loadData());
    setIsOpenModal(true);
  };
  const handleClickOkAddMaterial = () => {
    setIsOpenModal(false);
  };
  const handleUpdateProduct = () => {
    dispatch(actions.ProductActions.addProduct());
    navigate(RouterLinks.PRODUCTS_PAGE);
  };
  const handleCancleProduct = () => {
    navigate(RouterLinks.PRODUCTS_PAGE);
  };
  return (
    <div className="update-product-page">
      <Modal
        title="Thêm mới nguyên liệu"
        open={isOpenModal}
        onCancel={() => setIsOpenModal(false)}
        onOk={handleClickOkAddMaterial}
        style={{ minHeight: "300px" }}
      >
        <ModalAddMaterial visible={isOpenModal} />
      </Modal>
      <Form form={form} onChange={handleChange} layout="vertical">
        <Row gutter={[20, 10]}>
          <Col span={24}>
            <div className="tittle-add-product-page"> Chỉnh sửa mặt hàng</div>
          </Col>
          <Col span={16}>
            <div className="info-product">
              <div className="content-info-poduct">
                <Row gutter={[10, 10]}>
                  <Col span={24}>
                    <div className="title-info-product">Thông tin chung</div>
                  </Col>
                  <Col span={6}>
                    <Form.Item
                      label="Ảnh mặt hàng"
                      name="file"
                      rules={[
                        {
                          required: true,
                          message: "Ảnh mặt hàng không  được bỏ trống",
                        },
                      ]}
                    >
                      <ImgCrop rotationSlider>
                        <Upload
                          name="file"
                          onChange={handleChangeFile}
                          listType="picture-card"
                          className="avatar-uploader"
                          showUploadList={false}
                          beforeUpload={handleUpload}
                          onPreview={handlePreview}
                        >
                          {file ? (
                            <img
                              src={fileUrl ? fileUrl : ``}
                              alt="avatar"
                              style={{ width: "100%" }}
                            />
                          ) : (
                            <img
                              src={`${serverConfig.server}/public/${infoProduct?.Thumbnail}`}
                              alt="avatar"
                              style={{ width: "100%" }}
                            />
                          )}
                        </Upload>
                      </ImgCrop>
                    </Form.Item>
                  </Col>
                  <Col span={18}>
                    <Col span={24}>
                      <Form.Item
                        rules={[
                          {
                            required: true,
                            message: "Tên mặt hàng không được bỏ trống",
                          },
                        ]}
                        name="Title"
                        label="Tên mặt hàng"
                        initialValue={infoProduct?.Title}
                      >
                        <Input placeholder="Nhập tên mặt hàng"></Input>
                      </Form.Item>
                    </Col>
                    <Col span={24}>
                      <Form.Item
                        name="Description"
                        label="Mô tả về mặt hàng"
                        initialValue={infoProduct?.Description}
                      >
                        <Input placeholder="Nhập mô tả"></Input>
                      </Form.Item>
                    </Col>
                  </Col>
                  <Col span={8}>
                    <Form.Item
                      name="category"
                      rules={[
                        {
                          required: true,
                          message: "Loại mặt hàng không  được bỏ trống",
                        },
                      ]}
                      label=" Loại mặt hàng"
                      initialValue={[`${infoProduct?.IdCategory}`]}
                    >
                      <Select options={category} />
                    </Form.Item>
                  </Col>

                  <Col span={8}>
                    <Form.Item
                      name="Price"
                      rules={[
                        {
                          required: true,
                          message: "Giá bán không  được bỏ trống",
                        },
                      ]}
                      label="Giá bán"
                      initialValue={infoProduct?.Price}
                    >
                      <Input placeholder="Nhập giá bán"></Input>
                    </Form.Item>
                  </Col>
                  <Col span={8}>
                    <Form.Item
                      name="Unit"
                      rules={[
                        {
                          required: true,
                          message: "Giá bán không  được bỏ trống",
                        },
                      ]}
                      label="Đơn vị"
                      initialValue={infoProduct?.Unit}
                    >
                      <Input placeholder="Nhập đơn vị"></Input>
                    </Form.Item>
                  </Col>
                  <Col span={16}></Col>

                  <Col span={8}>
                    <Button
                      onClick={handleCancleProduct}
                      danger
                      style={{ marginRight: "10px" }}
                    >
                      Hủy
                    </Button>
                    <Button type="primary" onClick={handleUpdateProduct}>
                      Cập nhật
                    </Button>
                  </Col>
                </Row>
              </div>
            </div>
          </Col>
          <Col span={8}>
            <div className="add-info">
              <div className="content-add-info-product">
                <Row gutter={[10, 10]}>
                  <Col span={24}>
                    <div className="title-add-info">Quản lý nguyên liệu</div>
                  </Col>
                  <Col span={24}>
                    <Input.Search
                      placeholder="Tìm kiếm nguyên liệu ..."
                      enterButton="Tìm kiếm"
                      size="middle"
                    />
                  </Col>
                  {Array.isArray(selectedMaterials) &&
                    selectedMaterials.map((selectedMaterial: any) => {
                      return (
                        <React.Fragment key={selectedMaterial.IdMaterial}>
                          <Col span={8}>
                            <span>{selectedMaterial.NameMaterial}</span>
                          </Col>
                          <Col span={12}>
                            <Form.Item
                              name={`amount${selectedMaterial.IdMaterial}`}
                              initialValue={selectedMaterial.Amount}
                            >
                              <InputNumber />
                            </Form.Item>
                          </Col>
                          <Col span={2}>{selectedMaterial.Unit}</Col>
                          <Col span={2}>
                            <div
                              onClick={() => {
                                const updatedSelectedMaterials =
                                  selectedMaterials.filter(
                                    (item: any) =>
                                      item.IdMaterial !==
                                      selectedMaterial.IdMaterial
                                  );
                                dispatch(
                                  actions.MaterialActions.selectedMaterial(
                                    updatedSelectedMaterials
                                  )
                                );
                              }}
                            >
                              X
                            </div>
                          </Col>
                        </React.Fragment>
                      );
                    })}
                  <Col span={24}>
                    <div style={{ color: "#1677ff", cursor: "pointer" }}>
                      <PlusOutlined />
                      <span
                        onClick={handleClickAddMaterial}
                        style={{ marginLeft: "5px" }}
                      >
                        Thêm mới nguyên liệu
                      </span>
                    </div>
                  </Col>
                </Row>
              </div>
            </div>
          </Col>
        </Row>
      </Form>
    </div>
  );
};
export default UpdateProductPage;
