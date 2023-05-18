import React, { useState } from "react";
import { Select, Space, Tooltip, Modal, Form, Button, Input } from "antd";
import type { SelectProps } from "antd";
import { customerServices } from "../../../../untils/networks/services/customerServices";
import { useSelector, useDispatch } from "react-redux";
import useAction from "../../../../redux/useActions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import { billServices } from "../../../../untils/networks/services/billService";
import { isDisabled } from "@testing-library/user-event/dist/utils";
import { notification } from "../../../../components/notification";

const getCustomer = async (searchValue: any) => {
  try {
    const customer = await customerServices.getAllCustomer(1, searchValue);
    if (Array.isArray(customer?.Data) && customer?.Data.length > 0) {
      const data = customer?.Data.map((Customer: any) => ({
        value: Customer?.IdCustomer,
        label: `${Customer?.Fullname} - ${Customer?.PhoneNumber}`,
      }));
      return data;
    }
  } catch (error) {
    return [];
  }
};
let timeout: ReturnType<typeof setTimeout> | null;

const fetch = (value: string, callback: Function) => {
  if (timeout) {
    clearTimeout(timeout);
    timeout = null;
  }
  const fake = () => getCustomer(value).then((res: any) => callback(res));
  if (value) {
    timeout = setTimeout(fake, 300);
  } else {
    callback([]);
  }
};

const SearchCustomer: React.FC<any> = () => {
  const [form] = Form.useForm();
  const actions = useAction();
  const dispatch = useDispatch();
  const selectedOrder = useSelector(
    (state: any) => state.orderpage.selectedOrder
  );
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const [data, setData] = useState<SelectProps["options"]>([]);
  const [value, setValue] = useState<string>(
    selectedOrder?.IdCustomerNavigation?.Fullname
  );

  React.useEffect(() => {
    setValue(selectedOrder?.IdCustomerNavigation?.Fullname);
  }, [selectedOrder]);

  const handleSearch = (newValue: string) => {
    fetch(newValue, setData);
  };

  const handleSelect = (value: string, options: any) => {
    setValue(value);
    dispatch(
      actions.OrderPageActions.setInfoUpdateOrder({
        IdOrder: selectedOrder?.IdOrder,
        IdCustomer: value,
      })
    );
    dispatch(actions.OrderPageActions.updateOrder());
  };
  const handleClickAddCustomer = () => {
    setIsOpenModal(true);
  };
  const handleCreateCustomer = async () => {
    try {
      dispatch(actions.StateAction.loadingState(true));
      let response = await customerServices.createCustomer(
        form.getFieldsValue()
      );
      if (response.Status) {
        let res = await billServices.updateOrder(selectedOrder?.IdOrder, {
          IdCustomer: response?.Data?.IdCustomer,
        });
        if (res?.Status) {
          dispatch(actions.OrderPageActions.loadSelectedOrder());
          dispatch(actions.StateAction.loadingState(false));
          setIsOpenModal(false);
          form.resetFields();
        } else {
          dispatch(actions.StateAction.loadingState(false));
          setIsOpenModal(false);
          notification({
            message: res.Message,
            title: "Thông báo",
            position: "top-right",
            type: "danger",
          });
          form.resetFields();
        }

        notification({
          message: "Thêm khách hàng thành công",
          title: "Thông báo",
          position: "top-right",
          type: "success",
        });
      } else {
        dispatch(actions.StateAction.loadingState(false));
        // setIsOpenModal(false);
        // form.resetFields();
        notification({
          message: response.Message,
          title: "Thông báo",
          position: "top-right",
          type: "danger",
        });
      }
    } catch (err: any) {
      setIsOpenModal(false);
      form.resetFields();
      notification({
        message: "server không phản hồi",
        title: "Thông báo",
        position: "top-right",
        type: "danger",
      });
    }
  };
  const handleValueCreateChange = () => {
    if (
      form.getFieldsValue().Fullname &&
      form.getFieldsValue().phoneNumber &&
      form.getFieldsValue().gender
    ) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  };
  return (
    <>
      <Modal
        title="Thêm khách hàng"
        open={isOpenModal}
        onCancel={() => {
          setIsOpenModal(false);
          form.resetFields();
        }}
        footer={[
          <Button
            key="back"
            onClick={() => {
              setIsOpenModal(false);
              form.resetFields();
            }}
          >
            Hủy
          </Button>,
          <Button
            disabled={disabled}
            key="submit"
            type="primary"
            onClick={handleCreateCustomer}
          >
            Thêm
          </Button>,
        ]}
      >
        <Form
          form={form}
          layout="vertical"
          onValuesChange={handleValueCreateChange}
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
          >
            <Input></Input>
          </Form.Item>
          <Form.Item
            rules={[
              {
                required: true,
                message: "Số điện thoại khách hàng không được bỏ trống",
              },
              {
                validator: async (_, value) => {
                  if (value) {
                    if (
                      value.toString().length < 10 ||
                      value.toString().length > 11
                    ) {
                      setDisabled(true);
                      throw new Error("số điện thoại không  hợp lệ! ");
                    }
                  }
                },
              },
            ]}
            name="phoneNumber"
            label="Số điện thoại"
          >
            <Input
              type="number"
              style={{ width: "100%" }}
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
            ></Input>
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
      <Space>
        <Select
          showSearch
          value={value}
          placeholder="Tìm kiếm khách hàng"
          style={{ width: 300 }}
          filterOption={false}
          onSearch={handleSearch}
          onSelect={handleSelect}
          notFoundContent={"No found data"}
          options={(data || []).map((Customer) => ({
            value: Customer?.value,
            label: Customer.label,
          }))}
          allowClear
          //onClear={() => handleClear(selectedOrder)}
        ></Select>
        <Tooltip placement="top" title="Thêm khách hàng">
          <FontAwesomeIcon
            onClick={handleClickAddCustomer}
            icon={faPlusCircle}
            className="icon-add-customer-order-detail"
          />
        </Tooltip>
      </Space>
    </>
  );
};

export default SearchCustomer;
