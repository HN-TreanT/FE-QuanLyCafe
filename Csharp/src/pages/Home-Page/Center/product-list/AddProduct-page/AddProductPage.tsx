import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Row, Col, Input, Select, Upload, Modal, Button, InputNumber } from "antd";
import { useDispatch, useSelector } from "react-redux";
import useAction from "../../../../../redux/useActions";
import { PlusOutlined, ArrowLeftOutlined } from "@ant-design/icons";
import ImgCrop from "antd-img-crop";
import type { RcFile, UploadFile } from "antd/es/upload/interface";
import "./AddProductPage.scss";
import { RouterLinks } from "../../../../../const";
import Spinn from "../../../../../components/Spinning/Spinning";
import ModalMaterials from "../../../../../components/ModalMaterials/ModalMaterials";
const AddProductPage: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const actions = useAction();
  const [form] = Form.useForm();
  const [isDisabled, setIsDisabled] = useState(true);
  const [isOpenModal, setIsOpenModal] = useState(false);
  let category: any[] = [];
  const selectedMaterials = useSelector((state: any) => state.material.selectedMaterials);

  useEffect(() => {
    dispatch(actions.CategoryActions.loadData());
  }, [dispatch, actions.CategoryActions]);

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
  const loading = useSelector((state: any) => state.state.loadingState);
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
  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );
  /////////////////////////////////////////
  const handleChange = () => {
    if (
      form.getFieldsValue().Title &&
      form.getFieldsValue().category &&
      form.getFieldsValue().Price &&
      form.getFieldsValue().Unit &&
      form.getFieldsValue().file
      //file
    ) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
    let formData = new FormData();
    formData.append("file", form.getFieldsValue()?.file?.file);
    formData.append("Description", form.getFieldsValue().Description);
    formData.append("Price", form.getFieldsValue().Price);
    formData.append("Unit", form.getFieldsValue().Unit);
    formData.append("Title", form.getFieldsValue().Title);
    formData.append("IdCategory", form.getFieldsValue().category);
    dispatch(actions.ProductActions.setInfoProduct(formData));
  };
  const handleChangeFile = (e: any) => {
    setFile(e.file);
  };
  const handleClickAddMaterial = (e: any) => {
    dispatch(actions.MaterialActions.setSelectedPage(1));
    dispatch(actions.MaterialActions.loadData());
    setIsOpenModal(true);
  };
  const handleClickOkAddMaterial = () => {
    dispatch(actions.MaterialActions.setSelectedPage(1));
    setIsOpenModal(false);
  };
  const handleAddProduct = () => {
    let data: any[] = [];
    data = Array.isArray(selectedMaterials?.selectedRows)
      ? selectedMaterials.selectedRows.map((selectedMaterial: any) => {
          return {
            IdMaterial: selectedMaterial.IdMaterial,
            Amount: form.getFieldsValue([`amount${selectedMaterial.IdMaterial}`])[
              `amount${selectedMaterial.IdMaterial}`
            ],
          };
        })
      : [];
    dispatch(actions.MaterialActions.infoUseMaterial(data));
    dispatch(
      actions.StateAction.redirect({
        navigate: navigate,
        path: RouterLinks.PRODUCTS_PAGE,
      })
    );

    dispatch(actions.ProductActions.addProduct());
  };
  const handleCancleProduct = () => {
    navigate(RouterLinks.PRODUCTS_PAGE);
  };
  return (
    <div className="add-product-page">
      <Modal
        title="Thêm mới nguyên liệu"
        open={isOpenModal}
        onCancel={() => {
          dispatch(actions.MaterialActions.setSelectedPage(1));
          setIsOpenModal(false);
        }}
        onOk={handleClickOkAddMaterial}
        style={{ minHeight: "300px" }}
      >
        <ModalMaterials visible={isOpenModal} />
      </Modal>

      <Form form={form} onValuesChange={handleChange} layout="vertical">
        <span onClick={handleCancleProduct} style={{ cursor: "pointer", color: "#666" }}>
          <ArrowLeftOutlined style={{ padding: "3px" }} />
          <span>Quay lại danh sách mặt hàng</span>
        </span>
        <Row gutter={[20, 10]}>
          <Col span={24}>
            <div className="tittle-add-product-page">Thêm mới mặt hàng</div>
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
                      <Upload
                        name="file"
                        onChange={handleChangeFile}
                        listType="picture-card"
                        className="avatar-uploader"
                        showUploadList={false}
                        beforeUpload={handleUpload}
                        onPreview={handlePreview}
                      >
                        {fileUrl ? (
                          <img
                            src={fileUrl ? fileUrl : ""}
                            alt="avatar"
                            style={{ width: "100%" }}
                          />
                        ) : (
                          uploadButton
                        )}
                      </Upload>
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
                      >
                        <Input placeholder="Nhập tên mặt hàng"></Input>
                      </Form.Item>
                    </Col>
                    <Col span={24}>
                      <Form.Item name="Description" label="Mô tả về mặt hàng">
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
                    >
                      <InputNumber
                        //type="number"
                        formatter={(value) => ` ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                        parser={(value: any) => value!.replace(/\$\s?|(,*)/g, "")}
                        addonAfter="VNĐ"
                        min={0}
                        style={{ width: "100%" }}
                        placeholder="Nhập giá bán"
                        // onKeyDown={(e) => {
                        //   if (e.key === "-" || e.key === "e" || e.key === "+" || e.key === "E") {
                        //    e.preventDefault();
                        //   }
                        // }}
                        onKeyPress={(e) => {
                          const charCode = e.which ? e.which : e.keyCode;
                          if (charCode < 48 || charCode > 57) {
                            e.preventDefault();
                          }
                        }}
                      ></InputNumber>
                    </Form.Item>
                  </Col>
                  <Col span={8}>
                    <Form.Item
                      name="Unit"
                      rules={[
                        {
                          required: true,
                          message: "Đơn vị không  được bỏ trống",
                        },
                      ]}
                      label="Đơn vị"
                    >
                      <Input placeholder="Nhập đơn vị"></Input>
                    </Form.Item>
                  </Col>
                  <Col span={18}></Col>

                  <Col span={6}>
                    <Button disabled={isDisabled} type="primary" onClick={handleAddProduct}>
                      Thêm mặt hàng
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
                  {Array.isArray(selectedMaterials?.selectedRows) &&
                    selectedMaterials.selectedRows.map((selectedMaterial: any) => {
                      return (
                        <React.Fragment key={selectedMaterial?.IdMaterial}>
                          <Col span={8}>
                            <span>{selectedMaterial?.NameMaterial}</span>
                          </Col>
                          <Col span={12}>
                            <Form.Item
                              name={`amount${selectedMaterial?.IdMaterial}`}
                              rules={[
                                {
                                  validator: async (_, value) => {
                                    if (!value) {
                                      throw new Error("Không được bỏ trống! ");
                                    }
                                  },
                                },
                              ]}
                            >
                              <Input
                                min={0}
                                type="number"
                                addonAfter={selectedMaterial?.Unit ? selectedMaterial?.Unit : ""}
                                onKeyDown={(e) => {
                                  if (
                                    e.key === "-" ||
                                    e.key === "e" ||
                                    e.key === "+" ||
                                    e.key === "E"
                                  ) {
                                    e.preventDefault();
                                  }
                                }}
                              />
                            </Form.Item>
                          </Col>
                          {/* <Col span={2}>{selectedMaterial.Unit}</Col> */}
                          <Col span={4}>
                            <div
                              style={{ cursor: "pointer" }}
                              onClick={() => {
                                const updatedSelectedMaterials =
                                  selectedMaterials.selectedRows.filter(
                                    (item: any) => item.IdMaterial !== selectedMaterial.IdMaterial
                                  );

                                const updateSelectedKeys = selectedMaterials.selectedRowKeys.filter(
                                  (item: any) => item !== selectedMaterial.IdMaterial
                                );

                                dispatch(
                                  actions.MaterialActions.selectedMaterial({
                                    selectedRows: updatedSelectedMaterials,
                                    selectedRowKeys: updateSelectedKeys,
                                  })
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
                      <span onClick={handleClickAddMaterial} style={{ marginLeft: "5px" }}>
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
export default AddProductPage;
