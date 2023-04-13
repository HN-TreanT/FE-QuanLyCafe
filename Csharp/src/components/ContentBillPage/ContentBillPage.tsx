import React, { useState, useEffect } from "react";
import "./ContentBillPage.scss";
import { Input, Select, Table, Image, Button, Form, Space } from "antd";
import { ColumnsType } from "antd/es/table";
import { TableRowSelection } from "antd/es/table/interface";
import billEmpty from "../../assets/empty-bill.svg";
import { ImageEmptyData } from "../ImageEmptyData/ImageEmptyData";
import { useDispatch, useSelector } from "react-redux";
import useAction from "../../redux/useActions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { BillSupport } from "../../const";

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
    render: (text) => <div>{`Bàn ${text}`}</div>,
  },
  {
    title: "Khách hàng",
    dataIndex: "customer",
  },
  {
    title: "Tổng tiền",
    dataIndex: "money",
    render: (text) => <div>{`${text} đ`}</div>,
  },
];

const ContentBillPage: React.FC<any> = ({ orders }) => {
  const dispatch = useDispatch();
  const actions = useAction();
  const selectedStateBill = useSelector(
    (state: any) => state.bill.selectedStateBill
  );
  const [data, setData] = useState(orders);
  useEffect(() => {
    setData(orders);
  }, [orders]);
  const [form] = Form.useForm();
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    console.log("selectedRowKeys changed: ", newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
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
          setSelectedRowKeys(newSelectedRowKeys);
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
          setSelectedRowKeys(newSelectedRowKeys);
        },
      },
    ],
  };
  const handleRowClick = (record: DataType) => {
    console.log(record);
  };

  const handleValueFormChange = () => {
    const a = BillSupport.SearchBill({
      ...form.getFieldsValue(),
      orders: orders,
    });
    if (form.getFieldsValue().searchValue) {
      setData(a);
    } else {
      setData(orders);
    }
  };
  const hanldeClickDelete = () => {
    console.log("delete ok");
  };
  return (
    <div className="container-bill">
      {orders.length ? (
        <>
          <div className="search-bill-of-bill-page">
            <Form
              form={form}
              layout="horizontal"
              onValuesChange={handleValueFormChange}
              className="form-css"
            >
              <Space.Compact>
                <Form.Item
                  initialValue={"nameCustomer"}
                  name="selectedTypeSearch"
                >
                  <Select
                    options={[
                      { value: "nameCustomer", label: "Tên khách hàng" },
                      { value: "phonenumber", label: "Số điện thoại" },
                      { value: "tableFood", label: "Bàn ăn" },
                    ]}
                  />
                </Form.Item>
                <Form.Item name="searchValue" className="input-search-bill">
                  <Input.Search placeholder="Nhập giá trị muốn tìm kiếm" />
                </Form.Item>
              </Space.Compact>
              <Button
                className="button-delete-bill"
                danger
                onClick={hanldeClickDelete}
              >
                <FontAwesomeIcon
                  icon={faTrash}
                  beat
                  className="icon-delete-bill"
                />
                Delete
              </Button>
            </Form>
          </div>
          <div className="list-bill-in-bill-page">
            <Table
              rowSelection={rowSelection}
              columns={columns}
              dataSource={data}
              pagination={{
                pageSize: 5,
                showSizeChanger: false,
                hideOnSinglePage: true,
              }}
              onRow={(record: DataType) => ({
                onClick: () => handleRowClick(record),
              })}
            />
          </div>
        </>
      ) : (
        <div className="bill-page-empty-data">
          <ImageEmptyData imagePath={billEmpty} width={150} height={150} />
        </div>
      )}
    </div>
  );
};

export default ContentBillPage;
