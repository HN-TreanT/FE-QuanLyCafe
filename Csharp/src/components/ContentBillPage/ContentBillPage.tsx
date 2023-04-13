import React, { useState, useEffect } from "react";
import "./ContentBillPage.scss";
import { Input, Select, Table, Image, Button } from "antd";
import { ColumnsType } from "antd/es/table";
import { TableRowSelection } from "antd/es/table/interface";
import billEmpty from "../../assets/empty-bill.svg";
import { ImageEmptyData } from "../ImageEmptyData/ImageEmptyData";
import { useDispatch, useSelector } from "react-redux";
import useAction from "../../redux/useActions";
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
const data: DataType[] = [];
for (let i = 0; i < 15; i++) {
  data.push({
    key: `mfkef${i}`,
    timepay: "32323",
    Id: "fefef3",
    customer: "43434",
    table: "rrer3r",
    money: 474545,
  });
}

const ContentBillPage: React.FC<any> = ({ orders }) => {
  const dispatch = useDispatch();
  const actions = useAction();
  const selectedStateBill = useSelector(
    (state: any) => state.bill.selectedStateBill
  );
  console.log(orders);
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
  const handleClickSearch = () => {
    console.log("ok");
  };
  const handleChangeTypeSearch = (e: any) => {
    console.log(e);
  };
  return (
    <div className="container-bill">
      {data.length ? (
        <>
          <div className="search-bill-of-bill-page">
            <Select
              defaultValue="typeSearch"
              style={{ width: 150 }}
              onChange={handleChangeTypeSearch}
              options={[
                { value: "typeSearch", label: "Loại tìm kiếm" },
                { value: "nameCustomer", label: "Tên khách hàng" },
                { value: "phonenumber", label: "Số điện thoại" },
                { value: "tableFood", label: "Bàn ăn" },
              ]}
            />
            <Input></Input>
            <Button type="primary" onClick={handleClickSearch}>
              Search
            </Button>
          </div>
          <div className="list-bill-in-bill-page">
            <Table
              rowSelection={rowSelection}
              columns={columns}
              dataSource={orders}
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
