import React, { useEffect, useRef, useState } from "react";
import { Modal, Button, Form, Input, Select, Row, Col, Menu, MenuProps } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCloudArrowUp, faMagnifyingGlass, faPlus } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import useAction from "../../../../redux/useActions";
import "./ListWarehouse.scss";
import ContentListWareHouse from "./ContentListWarehouse/ContentListWareHouse";
import dayjs from "dayjs";
import "dayjs/locale/vi"; // nếu muốn sử dụng ngôn ngữ tiếng Việt
import { notification } from "../../../../components/notification";
import { materialService } from "../../../../untils/networks/services/materialService";
import useDebounce from "../../../../hooks/useDebounce";
import * as XLSX from "xlsx";

const items: MenuProps["items"] = [
  {
    label: "Nguyên liệu",
    key: "material",
  },
];

const ListWarehouse: React.FC = () => {
  const inputRef: any = useRef(null);
  const dispatch = useDispatch();
  const actions = useAction();
  const [form] = Form.useForm();
  const [formCreate] = Form.useForm();

  const [isDisabled, setIsDisabled] = useState(true);
  const [IsOpenModalCreate, setIsOpenModalCreate] = useState(false);
  const materials = useSelector((state: any) => state.material.materials);
  const selectedPage = useSelector((state: any) => state.material.selectedPage);
  const [searchValue, setSearchValue] = useState("");
  const searchValueDebounce = useDebounce<string>(searchValue, 500);
  useEffect(() => {
    dispatch(actions.MaterialActions.setSearchValue(searchValueDebounce));
    dispatch(actions.MaterialActions.loadData());
  }, [dispatch, actions.MaterialActions, selectedPage, searchValueDebounce]);

  //click open modal add material
  const handleClickButtonAddMaterial = () => {
    setIsOpenModalCreate(true);
    formCreate.resetFields();
  };
  //handle add material
  const handleCreate = async () => {
    try {
      dispatch(actions.StateAction.loadingState(true));
      let response = await materialService.createMaterial(formCreate.getFieldsValue());
      if (response.Status) {
        dispatch(actions.MaterialActions.loadData());
        dispatch(actions.StateAction.loadingState(false));
        setIsOpenModalCreate(false);
        notification({
          message: "create success",
          title: "Thông báo",
          position: "top-right",
          type: "success",
        });
      } else {
        notification({
          message: response.Message,
          title: "Thông báo",
          position: "top-right",
          type: "danger",
        });
        dispatch(actions.StateAction.loadingState(false));
        setIsOpenModalCreate(false);
      }
    } catch (err: any) {
      dispatch(actions.StateAction.loadingState(false));
      setIsOpenModalCreate(false);
      notification({
        message: "server not resposne",
        title: "Thông báo",
        position: "top-right",
        type: "danger",
      });
    }
  };
  const handleValueCreateChange = () => {
    if (
      formCreate.getFieldsValue().NameMaterial &&
      formCreate.getFieldsValue().Unit &&
      formCreate.getFieldsValue().Expiry
    ) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  };
  //hadle search
  const handleSearchValueChange = (e: any) => {
    dispatch(actions.MaterialActions.setSelectedPage(1));
    setSearchValue(e.target.value);
  };
  const handleImportExcel = async (e: any) => {
    const files = e.target.files;
    if (files.length) {
      const file = files[0];
      const reader = new FileReader();
      reader.onload = async (e: any) => {
        const wb = XLSX.read(e.target.result);
        const sheet = wb.SheetNames;
        if (sheet.length) {
          const rows = XLSX.utils.sheet_to_json(wb.Sheets[sheet[0]]);
          if (Array.isArray(rows)) {
            const createManyMaterial = rows.map((item: any) =>
              materialService.createMaterial(item)
            );
            try {
              dispatch(actions.StateAction.loadingState(true));
              const result = await Promise.all(createManyMaterial);
              if (result.length > 0) {
                notification({
                  message: "Thêm nguyên liệu thành công",
                  title: "Thông báo",
                  position: "top-right",
                  type: "success",
                });
              }
              dispatch(actions.StateAction.loadingState(false));
              dispatch(actions.MaterialActions.loadData());
              inputRef.current.value = null;
            } catch {
              dispatch(actions.StateAction.loadingState(false));
              notification({
                message: "Nhập nguyên liệu thất bại",
                title: "Thông báo",
                position: "top-right",
                type: "danger",
              });
              inputRef.current.value = null;
            }
          }
        }
      };
      reader.readAsArrayBuffer(file);
    }
  };
  return (
    <div className="listWarehouse-page">
      <Modal
        title="Thêm nguyên liệu"
        open={IsOpenModalCreate}
        onCancel={() => {
          setIsOpenModalCreate(false);
          formCreate.resetFields();
        }}
        footer={[
          <Button
            key="back"
            onClick={() => {
              setIsOpenModalCreate(false);
              formCreate.resetFields();
            }}
          >
            Hủy
          </Button>,
          <Button disabled={isDisabled} key="submit" type="primary" onClick={handleCreate}>
            Thêm
          </Button>,
        ]}
      >
        <Form form={formCreate} layout="vertical" onValuesChange={handleValueCreateChange}>
          <Row gutter={[15, 15]}>
            <Col span={24}>
              <Form.Item
                rules={[
                  {
                    required: true,
                    message: "Tên nguyên liêụ không được bỏ trống",
                  },
                ]}
                name="NameMaterial"
                label="Tên nguyên liệu"
              >
                <Input></Input>
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item name="Description" label="Mô tả về nguyên liệu">
                <Input></Input>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                rules={[
                  {
                    required: true,
                    message: "Đơn vị khách hàng không được bỏ trống",
                  },
                ]}
                name="Unit"
                label="Đơn vị"
              >
                <Input></Input>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                rules={[
                  {
                    required: true,
                    message: "hạn sử dụng không được bỏ trống",
                  },
                ]}
                name="Expiry"
                label="Thời gian sử dụng"
              >
                <Input
                  type="number"
                  addonAfter="ngày"
                  style={{ width: "100%" }}
                  onKeyDown={(e) => {
                    if (e.key === "-" || e.key === "e" || e.key === "+" || e.key === "E") {
                      e.preventDefault();
                    }
                  }}
                />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>
      <Row gutter={[0, 15]}>
        <Col span={24}>
          <div className="title-button-listWarehouse-page">
            <div className="title-listWarehouse-page">Nguyên liệu</div>
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
              <Button
                onClick={handleClickButtonAddMaterial}
                type="primary"
                className="button-add-listWarehouse"
              >
                <FontAwesomeIcon icon={faPlus} />
                <span>Thêm nguyên liệu</span>
              </Button>
              <div className="uploadFileImportExcel">
                <div className="custom-file">
                  <input
                    ref={inputRef}
                    hidden
                    type="file"
                    name="file"
                    className="custom-file-input"
                    id="inputGroupFile"
                    required
                    onChange={handleImportExcel}
                    accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                  />
                  <label className="custom-file-label" htmlFor="inputGroupFile">
                    <FontAwesomeIcon icon={faCloudArrowUp} />
                    <span style={{ marginLeft: "5px" }}>Nhập danh sách</span>
                  </label>
                </div>
              </div>
            </div>
          </div>
        </Col>
        <Col span={24}>
          <div className="container-listWarehouse-page">
            <div className="header-listWarehouse-page">
              <Row>
                <Col span={24}>
                  <Menu selectedKeys={["material"]} mode="horizontal" items={items} />
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
                    //  onValuesChange={handleValueFormChange}
                    className="form-css"
                  >
                    <Form.Item name="searchValue" className="input-search-listWarehouse">
                      <Input
                        onChange={handleSearchValueChange}
                        placeholder="Nhập giá trị muốn tìm kiếm theo loại"
                        prefix={
                          <FontAwesomeIcon icon={faMagnifyingGlass} className="icon-search" />
                        }
                      />
                    </Form.Item>
                  </Form>
                </Col>
                <ContentListWareHouse
                  total={materials?.TotalPage ? materials?.TotalPage : 0}
                  data={
                    Array.isArray(materials?.Data)
                      ? materials.Data.map((material: any) => {
                          dayjs.locale("vi");
                          const date = dayjs(material?.CreatedAt);
                          const now = dayjs();
                          const diffInMs = now.diff(date);
                          const diffInDays = Math.floor(diffInMs / 86400000);
                          return {
                            key: material?.IdMaterial,
                            IdMaterial: material?.IdMaterial,
                            NameMaterial: material?.NameMaterial,
                            amount: material?.Amount.toFixed(2),
                            unit: material?.Unit,
                            Description: material?.Description,
                            expiry: diffInDays < material?.Expiry ? "Còn hạn" : "Hết hạn",
                          };
                        })
                      : []
                  }
                />
              </Row>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
};
export default ListWarehouse;
