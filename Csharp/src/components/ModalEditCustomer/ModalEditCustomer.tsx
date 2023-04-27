import { Button, Form, Input, Modal, Select } from "antd";
import React, { useState, useEffect } from "react";
import { notification } from "../notification";
import { customerServices } from "../../untils/networks/services/customerServices";
import { useDispatch, useSelector } from "react-redux";
import useAction from "../../redux/useActions";
const ModalEditCustomer: React.FC<any> = ({ isOpen, data }) => {
  const dispatch = useDispatch();
  const actions = useAction();
  const [formEditCustomer] = Form.useForm();
  const [isOpenModalEdit, setIsOpenModalEdit] = useState(isOpen);
  const [customerDetail, setCustomerDetail] = useState(data);
  const [isDisabled, setIsDisabled] = useState(true);
  useEffect(() => {
    setCustomerDetail(data);
    setIsOpenModalEdit(isOpen);
    formEditCustomer.setFieldsValue(data);
  }, [isOpen, data, formEditCustomer]);
  const handleValueEditChange = () => {
    if (
      formEditCustomer.getFieldsValue().Fullname &&
      formEditCustomer.getFieldsValue().phoneNumber &&
      formEditCustomer.getFieldsValue().gender
    ) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  };
  const handleUpdateCustomer = async () => {
    setIsOpenModalEdit(false);
    try {
      if (customerDetail?.key) {
        dispatch(actions.StateAction.loadingState(true));
        let response = await customerServices.updateCustomer(
          customerDetail?.key,
          formEditCustomer.getFieldsValue()
        );
        if (response.Status) {
          dispatch(actions.CustomerActions.loadData());
          dispatch(actions.StateAction.loadingState(false));
          notification({
            message: "Update success",
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
        }
      }
    } catch (err: any) {
      notification({
        message: "server không phản hồi",
        title: "Thông báo",
        position: "top-right",
        type: "danger",
      });
    }
  };
  return (
    <Modal
      title="Chỉnh sửa thông tin khách hàng"
      open={isOpenModalEdit}
      onCancel={() => {
        setIsOpenModalEdit(false);
        //  formAddCustomer.resetFields();
      }}
      footer={[
        <Button
          key="back"
          onClick={() => {
            setIsOpenModalEdit(false);
            // formAddCustomer.resetFields();
          }}
        >
          Hủy
        </Button>,
        <Button
          disabled={isDisabled}
          key="submit"
          type="primary"
          onClick={handleUpdateCustomer}
        >
          Lưu thay đổi
        </Button>,
      ]}
    >
      <Form
        form={formEditCustomer}
        layout="vertical"
        onValuesChange={handleValueEditChange}
      >
        <Form.Item
          rules={[
            {
              required: true,
              message: "Tên khách hàng không được bỏ trống",
            },
          ]}
          name="Fullname"
          label="Tên khách hàng"
          initialValue={customerDetail?.Fullname}
        >
          <Input></Input>
        </Form.Item>
        <Form.Item
          rules={[
            {
              required: true,
              message: "Số điện thoại khách hàng không được bỏ trống",
            },
          ]}
          initialValue={customerDetail?.PhoneNumber}
          name="phoneNumber"
          label="Số điện thoại"
        >
          <Input></Input>
        </Form.Item>
        <Form.Item
          rules={[
            {
              required: true,
              message: "Giới tinh khách hàng không được bỏ trống",
            },
          ]}
          name="gender"
          label="Giới tính"
          initialValue={customerDetail?.Gender}
        >
          <Select
            options={[
              {
                label: "Nam",
                value: "nam",
              },
              {
                label: "Nữ",
                value: "Nu",
              },
            ]}
          ></Select>
        </Form.Item>
      </Form>
    </Modal>
  );
};
export default ModalEditCustomer;
