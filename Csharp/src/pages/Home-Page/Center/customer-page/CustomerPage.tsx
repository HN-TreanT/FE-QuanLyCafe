import React, { useEffect, useState } from "react";
import {
  Row,
  Col,
  Button,
  Table,
  Form,
  Menu,
  MenuProps,
  Input,
  Modal,
  Select,
} from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { ColumnsType } from "antd/es/table";
import useAction from "../../../../redux/useActions";
import "./CustomerPage.scss";
import useDebounce from "../../../../hooks/useDebounce";
import { notification } from "../../../../components/notification";
import { customerServices } from "../../../../untils/networks/services/customerServices";
import ModalEditCustomer from "../../../../components/ModalEditCustomer/ModalEditCustomer";

interface DataType {
  key: string;
  Fullname: string;
  PhoneNumber: string;
  Gender: string;
  countOrders: Number;
  TotalPay: Number;
}
interface CustomerDetail {
  Fullname: string;
  PhoneNumber: string;
  Gender: string;
  key: string;
}
const items: MenuProps["items"] = [
  {
    label: "Tất cả khách hàng",
    key: "customers",
  },
];

const CustomerPage: React.FC = () => {
  const columns: ColumnsType<DataType> = [
    {
      title: "Khách hàng",
      dataIndex: "Fullname",
      render: (text) => <div style={{ color: "#1677ff" }}>{text}</div>,
    },
    {
      title: "Số điện thoại",
      dataIndex: "PhoneNumber",
    },
    {
      title: "Giới tính",
      dataIndex: "Gender",
    },
    {
      title: "Số hóa đơn",
      dataIndex: "countOrders",
    },
    {
      title: "Tổng chi tiêu",
      dataIndex: "TotalPay",
      render: (text) => <div>{`${text} đ`}</div>,
    },
    {
      title: "",
      dataIndex: "buttonDelete",
      render: (text: any, record: DataType) => (
        <div
          onClick={(e) => handleDeleteCustomer(e, record)}
          className="table-delete"
          style={{ cursor: "pointer" }}
        >
          X
        </div>
      ),
    },
  ];
  const [form] = Form.useForm();
  const [formAddCustomer] = Form.useForm();
  const actions = useAction();
  const dispatch = useDispatch();
  let selectedPage = useSelector((state: any) => state.customer.selectedPage);
  const [IsOpenModalCreate, setIsOpenModalCreate] = useState(false);
  const [IsOpenModalEdit, setIsOpenModalEdit] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [isDisabled, setIsDisabled] = useState(true);
  const [customerDetail, setCustomerDetail] = useState<CustomerDetail>();
  const searchValueDebounce = useDebounce<string>(searchValue, 500);

  useEffect(() => {
    dispatch(actions.CustomerActions.setSearchValue(searchValueDebounce));
    dispatch(actions.CustomerActions.loadData());
  }, [
    actions.CustomerActions,
    dispatch,
    selectedPage,
    searchValueDebounce,
    customerDetail,
  ]);
  let customers = useSelector((state: any) => state.customer.customers);
  const valueCustomers = customers?.Data?.map((customer: any) => {
    return {
      key: customer?.IdCustomer,
      Fullname: customer?.Fullname,
      PhoneNumber: customer?.PhoneNumber,
      Gender: customer?.Gender === "nam" ? "Nam" : "Nữ",
      countOrders: customer?.Orders.length,
      TotalPay: customer?.Orders?.reduce(function (
        total: Number,
        currentValue: any
      ) {
        return (
          total +
          currentValue?.OrderDetails.reduce(function (
            total: Number,
            currentValue: any
          ) {
            return total + currentValue.Price;
          },
          0)
        );
      },
      0),
    };
  });

  const loading = useSelector((state: any) => state.state.loadingState);
  const handleClickButtonAddProduct = () => {
    setIsOpenModalCreate(true);
  };
  const handleRowClick = (record: any) => {
    setIsOpenModalEdit(true);
    setCustomerDetail({
      Fullname: record.Fullname ? record.Fullname : "",
      PhoneNumber: record.PhoneNumber ? record.PhoneNumber : "",
      Gender: record.Gender ? record.Gender : "",
      key: record.key ? record.key : "",
    });
  };
  const handleValueFormChange = () => {};
  const handleSearchValueChange = (e: any) => {
    setSearchValue(e.target.value);
  };
  const handleDeleteCustomer = async (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    record: any
  ) => {
    e.stopPropagation();
    console.log(record.key);
    try {
      dispatch(actions.StateAction.loadingState(true));
      const reponse = await customerServices.deleteCustomer(record.key);
      if (reponse.Status) {
        dispatch(actions.CustomerActions.loadData());
        dispatch(actions.StateAction.loadingState(false));
        notification({
          message: "xóa thành công",
          title: "Thông báo",
          position: "top-right",
          type: "success",
        });
      } else {
        notification({
          message: "xóa không thành công",
          title: "Thông báo",
          position: "top-right",
          type: "danger",
        });
        dispatch(actions.StateAction.loadingState(false));
      }
    } catch (err: any) {
      notification({
        message: "server không trả lời",
        title: "Thông báo",
        position: "top-right",
        type: "danger",
      });
      dispatch(actions.StateAction.loadingState(false));
    }
  };
  const handleCreateCustomer = async () => {
    try {
      dispatch(actions.StateAction.loadingState(true));
      let response = await customerServices.createCustomer(
        formAddCustomer.getFieldsValue()
      );
      if (response.Status) {
        dispatch(actions.CustomerActions.loadData());
        dispatch(actions.StateAction.loadingState(false));
        setIsOpenModalCreate(false);
        formAddCustomer.resetFields();
        notification({
          message: "Thêm khách hàng thành công",
          title: "Thông báo",
          position: "top-right",
          type: "success",
        });
      } else {
        dispatch(actions.StateAction.loadingState(false));
        setIsOpenModalCreate(false);
        formAddCustomer.resetFields();
        notification({
          message: response.Message,
          title: "Thông báo",
          position: "top-right",
          type: "danger",
        });
      }
    } catch (err: any) {
      setIsOpenModalCreate(false);
      formAddCustomer.resetFields();
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
      formAddCustomer.getFieldsValue().Fullname &&
      formAddCustomer.getFieldsValue().phoneNumber &&
      formAddCustomer.getFieldsValue().gender
    ) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  };
  return (
    <div className="customer-page">
      <Modal
        title="Thêm khách hàng"
        open={IsOpenModalCreate}
        onCancel={() => {
          setIsOpenModalCreate(false);
          formAddCustomer.resetFields();
        }}
        footer={[
          <Button
            key="back"
            onClick={() => {
              setIsOpenModalCreate(false);
              formAddCustomer.resetFields();
            }}
          >
            Hủy
          </Button>,
          <Button
            disabled={isDisabled}
            key="submit"
            type="primary"
            onClick={handleCreateCustomer}
          >
            Thêm
          </Button>,
        ]}
      >
        <Form
          form={formAddCustomer}
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
                      setIsDisabled(true);
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
      <ModalEditCustomer isOpen={IsOpenModalEdit} data={customerDetail} />
      <Row gutter={[0, 15]}>
        <Col span={24}>
          <div className="title-button-customer-page">
            <div className="title-customer-page">Danh sách khách hàng</div>
            <Button
              onClick={handleClickButtonAddProduct}
              type="primary"
              className="button-add-customer"
            >
              <FontAwesomeIcon icon={faPlus} />
              <span> Thêm khách hàng</span>
            </Button>
          </div>
        </Col>
        <Col span={24}>
          <div className="container-customer-page">
            <div className="header-customer-page">
              <Row>
                <Col span={24}>
                  <Menu
                    selectedKeys={["customers"]}
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
                      className="input-search-customer"
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
            <div className="content-customer-page">
              <Table
                loading={loading}
                style={{ marginLeft: "20px" }}
                columns={columns}
                dataSource={valueCustomers}
                pagination={{
                  defaultCurrent: selectedPage,
                  pageSize: 5,
                  total: customers?.TotalPage,
                  onChange: (page) => {
                    dispatch(actions.CustomerActions.setSelectedPage(page));
                    dispatch(actions.CustomerActions.loadData());
                  },
                }}
                onRow={(record: DataType) => ({
                  onClick: () => handleRowClick(record),
                })}
              />
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
};
export default CustomerPage;
