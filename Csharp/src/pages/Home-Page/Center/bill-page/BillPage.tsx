import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col, Table, Form, Modal, MenuProps, Menu, Button, Input } from "antd";
import { ColumnsType } from "antd/es/table";
import { TableRowSelection } from "antd/es/table/interface";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import useAction from "../../../../redux/useActions";
import { orderDetailServices } from "../../../../untils/networks/services/OrderDetailService";
import ItemOrderDetail from "../../../../components/ItemDetailOrder/ItemDetailOrder";
import "./BillPage.scss";
import useDebounce from "../../../../hooks/useDebounce";
import { VND } from "../../../../const/convertVND";
interface DataType {
  key: string;
  timepay: string;
  Id: string;
  table: string;
  customer: string;
  money: Number;
}
const columns: ColumnsType<DataType> = [
  {
    title: "Thời gian thanh toán",
    dataIndex: "timepay",
  },
  {
    title: "Mã tham chiếu",
    dataIndex: "Id",
    render: (text) => <div style={{ color: "#1677ff" }}>{text}</div>,
  },
  {
    title: "Bàn ăn",
    dataIndex: "table",
    render: (text) => <div>{text}</div>,
  },
  {
    title: "Khách hàng",
    dataIndex: "customer",
  },
  {
    title: "Tổng tiền",
    dataIndex: "money",
    render: (text) => <div>{`${text}`}</div>,
  },
];
const items: MenuProps["items"] = [
  {
    label: "Tất cả hóa đơn",
    key: "getAllOrder",
  },
  {
    label: "Đã thanh toán",
    key: "getOrderPaid",
  },
  {
    label: "Chờ xác nhận thanh toán",
    key: "getOrderUnpaid",
  },
];

const BillPage: React.FC = () => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const actions = useAction();
  const selectedStateBill = useSelector((state: any) => state.bill.selectedStateBill);
  const selectedRowKeys = useSelector((state: any) => state.bill.selectedRowKeys);
  const [rowClickKey, setRowClickKey] = useState("");
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [orderDts, setOrderDts] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const selectedPage = useSelector((state: any) => state.bill.selectedPage);
  const loading = useSelector((state: any) => state.state.loadingState);
  const orders = useSelector((state: any) => state.bill.billData);
  const data = orders?.Data?.map((order: any) => {
    const date = new Date(order?.TimePay);
    const formattedDate = date.toLocaleDateString("vi-VN");
    return {
      key: order?.IdOrder,
      timepay: order.TimePay ? formattedDate : "Chưa thanh toán",
      Id: order?.IdOrder,
      table: order?.NameTable ? `Bàn ${order?.NameTable}` : "Đã xóa",
      customer: order?.Fullname,
      money: order?.payments ? VND.format(order.payments) : 0,
      phonenumber: order?.PhoneNumber,
    };
  });
  const searchValueDebounce = useDebounce<string>(searchValue, 500);
  useEffect(() => {
    dispatch(actions.BillActions.setSearchValue(searchValueDebounce));
    dispatch(actions.BillActions.loadData());
  }, [actions.BillActions, dispatch, selectedStateBill, selectedPage, searchValueDebounce]);
  const handleSeletected = (e: any) => {
    dispatch(actions.BillActions.selectedStateBill(e.key));
  };
  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    dispatch(actions.BillActions.selectedRowKeys(newSelectedRowKeys));
  };
  const rowSelection: TableRowSelection<DataType> = {
    selectedRowKeys,
    onChange: onSelectChange,
    selections: [
      Table.SELECTION_ALL,
      Table.SELECTION_INVERT,
      Table.SELECTION_NONE,
      {
        key: "odd",
        text: "Select Odd Row",
        onSelect: (changeableRowKeys) => {
          let newSelectedRowKeys = [];
          newSelectedRowKeys = changeableRowKeys.filter((_, index) => {
            if (index % 2 !== 0) {
              return false;
            }
            return true;
          });
          dispatch(actions.BillActions.selectedRowKeys(newSelectedRowKeys));
        },
      },
      {
        key: "even",
        text: "Select Even Row",
        onSelect: (changeableRowKeys) => {
          let newSelectedRowKeys = [];
          newSelectedRowKeys = changeableRowKeys.filter((_, index) => {
            if (index % 2 !== 0) {
              return true;
            }
            return false;
          });
          dispatch(actions.BillActions.selectedRowKeys(newSelectedRowKeys));
        },
      },
    ],
  };

  const hanldeClickDelete = () => {
    dispatch(actions.BillActions.deleteBill());
  };
  const handleRowClick = async (record: DataType) => {
    setRowClickKey(record.key);
    setIsOpenModal(true);
    const OrderDetails = await orderDetailServices.handleGetOrderByIdOrder(record.key);
    if (OrderDetails.Status) {
      setOrderDts(OrderDetails.Data ? OrderDetails.Data : []);
    } else {
      setOrderDts([]);
    }
  };
  const handleSearchNameCustomer = (e: any) => {
    dispatch(actions.BillActions.setTypeSearch("nameCustomer"));
    dispatch(actions.BillActions.selectedPage(1));
    setSearchValue(e.target.value);
  };
  const handleSearchPhoneCustomer = (e: any) => {
    dispatch(actions.BillActions.setTypeSearch("phonenumber"));
    dispatch(actions.BillActions.selectedPage(1));
    setSearchValue(e.target.value);
  };
  const handlSearchTableFood = (e: any) => {
    dispatch(actions.BillActions.setTypeSearch("tableFood"));
    dispatch(actions.BillActions.selectedPage(1));
    setSearchValue(e.target.value);
  };
  return (
    <div className="bill-page">
      <Row gutter={[0, 35]}>
        <Col span={24}>
          <div className="title-bill-page">Hóa Đơn</div>
        </Col>
        <Col span={24}>
          <div className="container-bill-page">
            <div className="nav-bill-page">
              <Row>
                <Col span={24}>
                  <Menu
                    className="nav-bill-page"
                    onClick={handleSeletected}
                    selectedKeys={selectedStateBill}
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
              </Row>
            </div>
            <div className="content-bill-page">
              <div className="container-bill">
                <Modal
                  title={`${rowClickKey}#Chi tiết hóa đơn`}
                  footer={null}
                  open={isOpenModal}
                  onCancel={() => setIsOpenModal(false)}
                >
                  <Row>
                    <ItemOrderDetail NameProduct="Tên món" Amount="Số lượng" Price="Giá thành" />
                    {orderDts.map((orderDetail: any) => {
                      return (
                        <ItemOrderDetail
                          key={orderDetail?.IdOrderDetail}
                          NameProduct={orderDetail.IdProductNavigation?.Title}
                          Amount={`x${orderDetail?.Amout}`}
                          Price={`${orderDetail?.Price ? VND.format(orderDetail.Price) : 0}`}
                        />
                      );
                    })}
                  </Row>
                </Modal>
                <div className="search-bill-of-bill-page">
                  <Form form={form} className="form-css">
                    <Row gutter={[30, 20]}>
                      <Col span={6}>
                        <Form.Item
                          name="Id"
                          className="input-search-import-warehouse input-label-inline-border"
                        >
                          <label className="ant-form-item-label" htmlFor="">
                            Tên khách hàng
                          </label>
                          <Input
                            bordered={false}
                            placeholder="Nhập tên khách hàng"
                            onChange={handleSearchNameCustomer}
                            prefix={
                              <FontAwesomeIcon
                                //  onClick={handleClickSearchId}
                                icon={faMagnifyingGlass}
                                className="icon-search"
                              />
                            }
                          />
                        </Form.Item>
                      </Col>
                      <Col span={6}>
                        <Form.Item
                          name="nameMaterial"
                          className="input-search-import-warehouse input-label-inline-border"
                        >
                          <label className="ant-form-item-label" htmlFor="">
                            Số điện thoại
                          </label>
                          <Input
                            onChange={handleSearchPhoneCustomer}
                            bordered={false}
                            placeholder="Nhập tên nguyên liệu"
                            prefix={
                              <FontAwesomeIcon icon={faMagnifyingGlass} className="icon-search" />
                            }
                          />
                        </Form.Item>
                      </Col>
                      <Col span={6}>
                        <Form.Item
                          name="time"
                          className="input-search-import-warehouse input-label-inline-border"
                        >
                          <label className="ant-form-item-label" htmlFor="">
                            Nhập tên bàn ăn
                          </label>
                          <Input
                            onChange={handlSearchTableFood}
                            bordered={false}
                            placeholder="Nhập tên bàn ăn"
                            prefix={
                              <FontAwesomeIcon icon={faMagnifyingGlass} className="icon-search" />
                            }
                          />
                        </Form.Item>
                      </Col>
                      <Col span={6}>
                        <Button className="button-delete-bill" danger onClick={hanldeClickDelete}>
                          <FontAwesomeIcon icon={faTrash} beat className="icon-delete-bill" />
                          Delete
                        </Button>
                      </Col>
                    </Row>
                  </Form>
                </div>
                <div className="list-bill-in-bill-page">
                  <Table
                    loading={loading}
                    rowSelection={rowSelection}
                    columns={columns}
                    dataSource={data}
                    pagination={{
                      total: orders?.TotalPage,
                      pageSize: 6,
                      defaultCurrent: selectedPage,
                      showSizeChanger: false,
                      hideOnSinglePage: true,
                      onChange: (page) => {
                        dispatch(actions.BillActions.selectedPage(page));
                      },
                    }}
                    onRow={(record: DataType) => ({
                      onClick: () => handleRowClick(record),
                    })}
                  />
                </div>
              </div>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
};
export default BillPage;
