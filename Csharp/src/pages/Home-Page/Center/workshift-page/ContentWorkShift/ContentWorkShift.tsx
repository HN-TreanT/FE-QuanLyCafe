import React, { useState } from "react";
import {
  Col,
  Row,
  Table,
  Form,
  Menu,
  Input,
  MenuProps,
  Button,
  Modal,
} from "antd";
import { useDispatch, useSelector } from "react-redux";
import { ColumnsType } from "antd/es/table";
import { useNavigate } from "react-router-dom";
import useAction from "../../../../../redux/useActions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
const items: MenuProps["items"] = [
  {
    label: "Tất cả ca làm",
    key: "allWorkshift",
  },
];
interface DataType {
  workShift: Number;
  ArrivalTime: any;
  TimeOn: any;
  count: Number;
}
const ContentWorkShift: React.FC<any> = ({ value }) => {
  console.log(value);
  const dispatch = useDispatch();
  const actions = useAction();
  const [form] = Form.useForm();
  const columns: ColumnsType<DataType> = [
    {
      title: "Ca làm",
      dataIndex: "workShift",
      render: (text) => <div style={{ color: "#1677ff" }}>{`Ca ${text}`}</div>,
    },
    {
      title: "Thời gian bắt đầu",
      dataIndex: "ArrivalTime",
    },
    {
      title: "Thời gian kết thúc",
      dataIndex: "TimeOn",
    },
    {
      title: "Số lượng nhân viên trong ca",
      dataIndex: "count",
    },
    {
      title: "",
      dataIndex: "deleteWorkshift",
      render: (text: any, record: DataType) => (
        <div
          onClick={(e) => handleDeleteWorkshift(e, record)}
          className="table-delete"
          style={{ cursor: "pointer" }}
        >
          X
        </div>
      ),
    },
  ];
  const [valueWorkShift, setValueWorkShift] = useState(value);
  const handleRowClick = (record: any) => {
    console.log(record.key);
  };
  const handleValueFormChange = () => {};
  const handleSearchValueChange = () => {};
  const handleDeleteWorkshift = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    record: any
  ) => {
    e.stopPropagation();
    console.log(record.key);
  };
  return (
    <>
      <Col span={24}>
        <div className="container-workshift-page">
          <div className="header-workshift-page">
            <Row>
              <Col span={24}>
                <Menu
                  selectedKeys={["allWorkshift"]}
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
                    className="input-search-workshift"
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
          <div className="content-workshift-page">
            <Table
              style={{ marginLeft: "20px" }}
              columns={columns}
              dataSource={valueWorkShift}
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
        </div>
      </Col>
    </>
  );
};
export default ContentWorkShift;
