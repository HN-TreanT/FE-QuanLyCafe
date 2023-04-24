import React, { useEffect, useState } from "react";
import { Row, Col, Button, Table, Form, Menu, MenuProps, Input } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { ColumnsType } from "antd/es/table";
import { useForm } from "antd/es/form/Form";
import useAction from "../../../../redux/useActions";
import { useNavigate } from "react-router-dom";
import "./CustomerPage.scss";
import useDebounce from "../../../../hooks/useDebounce";

// import ContentCustomerPage from "./ContenCustomerPage/ContentCustomerPage";
interface DataType {
  key: string;
  Fullname: string;
  PhoneNumber: string;
  countOrders: Number;
  TotalPay: Number;
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
      title: "Số hóa đơn",
      dataIndex: "countOrders",
    },
    {
      title: "Tổng chi tiêu",
      dataIndex: "TotalPay",
    },
    {
      title: "",
      dataIndex: "buttonDelete",
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
  const [form] = useForm();
  const actions = useAction();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  let selectedPage = useSelector((state: any) => state.customer.selectedPage);
  const [searchValue, setSearchValue] = useState("");
  const searchValueDebounce = useDebounce<string>(searchValue, 500);
  useEffect(() => {
    dispatch(actions.CustomerActions.setSearchValue(searchValueDebounce));
    dispatch(actions.CustomerActions.loadData());
  }, [actions.CustomerActions, dispatch, selectedPage, searchValueDebounce]);
  let customers = useSelector((state: any) => state.customer.customers);
  console.log(customers);
  const valueCustomers = customers.Data?.map((customer: any) => {
    return {
      key: customer?.IdCustomer,
      Fullname: customer?.Fullname,
      PhoneNumber: customer?.PhoneNumber,
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
  const handleClickButtonAddProduct = () => {};
  const handleRowClick = (record: any) => {};
  const handleValueFormChange = () => {};
  const handleSearchValueChange = (e: any) => {
    setSearchValue(e.target.value);
  };
  const handleDeleteCategory = (e: any, record: any) => {};
  return (
    <div className="customer-page">
      <Row gutter={[0, 15]}>
        <Col span={24}>
          <div className="title-button-customer-page">
            <div className="title-customer-page">Danh sách mặt hàng</div>
            <Button
              onClick={handleClickButtonAddProduct}
              type="primary"
              className="button-add-customer"
            >
              <FontAwesomeIcon icon={faPlus} />
              <span> Thêm mặt hàng</span>
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
