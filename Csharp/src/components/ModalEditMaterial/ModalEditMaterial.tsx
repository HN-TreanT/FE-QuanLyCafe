import { Button, Col, Form, Input, Modal, Row } from "antd";
import { useDispatch } from "react-redux";
import useAction from "../../redux/useActions";
import { materialService } from "../../untils/networks/services/materialService";
import { notification } from "../notification";
import React, { useEffect, useState } from "react";
const ModalEditMaterial: React.FC<any> = ({ isOpen, data }) => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const actions = useAction();
  const [isOpenModalEdit, SetIsOpenModalEdit] = useState(isOpen);
  const [materialsDetail, setMaterialDetail] = useState<any>(data);
  const [isDisabled, setIsDisabled] = useState(true);
  useEffect(() => {
    SetIsOpenModalEdit(isOpen);
    setMaterialDetail(data);
    form.setFieldsValue(data);
  }, [data, isOpen, form, materialsDetail]);
  const handleUpdate = async () => {
    try {
      dispatch(actions.StateAction.loadingState(true));
      let response = await materialService.updateMaterial(
        materialsDetail.IdMaterial,
        form.getFieldsValue()
      );
      if (response.Status) {
        dispatch(actions.MaterialActions.loadData());
        dispatch(actions.StateAction.loadingState(false));
        SetIsOpenModalEdit(false);
        notification({
          message: "update success",
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
        SetIsOpenModalEdit(false);
      }
    } catch (err: any) {
      dispatch(actions.StateAction.loadingState(false));
      SetIsOpenModalEdit(false);
      notification({
        message: "server not resposne",
        title: "Thông báo",
        position: "top-right",
        type: "danger",
      });
    }
    form.resetFields();
  };

  const handleValueChange = () => {
    if (form.getFieldsValue().NameMaterial && form.getFieldsValue().Unit) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  };
  return (
    <Modal
      title="Sửa đổi thông tin nguyên liệu"
      open={isOpenModalEdit}
      onCancel={() => {
        SetIsOpenModalEdit(false);
        form.resetFields();
      }}
      footer={[
        <Button
          key="back"
          onClick={() => {
            SetIsOpenModalEdit(false);
            form.resetFields();
          }}
        >
          Hủy
        </Button>,
        <Button
          disabled={isDisabled}
          key="submit"
          type="primary"
          onClick={handleUpdate}
        >
          Lưu thay đổi
        </Button>,
      ]}
    >
      <Form form={form} layout="vertical" onValuesChange={handleValueChange}>
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
              initialValue={materialsDetail?.NameMaterial}
            >
              <Input></Input>
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item
              initialValue={materialsDetail?.Description}
              name="Description"
              label="Mô tả về nguyên liệu"
            >
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
              initialValue={materialsDetail?.unit}
            >
              <Input></Input>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
};

export default ModalEditMaterial;
