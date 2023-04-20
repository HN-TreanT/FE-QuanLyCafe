import {
  Col,
  Row,
  Table,
  Form,
  Menu,
  Select,
  Input,
  MenuProps,
  Button,
  Image,
} from "antd";
import React, { useEffect, useState } from "react";
import { ProductSupport } from "../../const/ProductSupport";
import { useDispatch, useSelector } from "react-redux";
import useAction from "../../redux/useActions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { ColumnsType } from "antd/es/table";
import { useNavigate } from "react-router-dom";
import { RouterLinks } from "../../const";
import { productServices } from "../../untils/networks/services/productService";
import { notification } from "../notification";
const items: MenuProps["items"] = [
  {
    label: "Tất cả nhân viên",
    key: "allStaff",
  },
  {
    label: "Đang làm việc",
    key: "staffWorking",
  },
];
interface DataType {
  email: string;
  nameStaff: string;
  state: string;
  address: string;
  phoneNumber: string;
  createdAt: string;
}
let data: any[] = [];
for (var i = 0; i < 15; i++) {
  data.push({
    key: `${i}`,
    email: "hntreant@23012",
    nameStaff: `Hoang Nam ${i}`,
    state: "Đang làm việc",
    address: "Hà Nội",
    phoneNumber: "972842",
    createdAt: "23/01/2002",
  });
}
const ContentStaffPage: React.FC<any> = ({ value }) => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const columns: ColumnsType<DataType> = [
    {
      title: "Email",
      dataIndex: "email",
      render: (text) => <div style={{ color: "#0088ff" }}>{text}</div>,
    },
    {
      title: "Tên nhân viên",
      dataIndex: "nameStaff",
    },
    {
      title: "Trạng thái",
      dataIndex: "state",
      render: (text) => <div style={{ color: "#0088ff" }}>{text}</div>,
    },
    {
      title: "Đỉa chỉ",
      dataIndex: "address",
    },
    {
      title: "Số điện thoại",
      dataIndex: "phoneNumber",
    },
    {
      title: "Ngày tạo",
      dataIndex: "createdAt",
    },
  ];
  const dispatch = useDispatch();
  const actions = useAction();
  const selectedStateStaff = useSelector(
    (state: any) => state.staff.selectedStateStaff
  );
  const [valueStaffs, setValueStaffs] = useState(value);
  useEffect(() => {
    setValueStaffs(value);
  }, [value]);
  //click row table
  const handleRowClick = (record: any) => {};
  //tìm kiếm
  const handleSearchValueChange = (e: any) => {};
  const handleSelectedStaffState = (e: any) => {
    dispatch(actions.StaffActions.seletedStateStaff(e.key));
  };
  return (
    <>
      <Col span={24}>
        <div className="container-staff-page">
          <div className="header-staff-page">
            <Row gutter={[15, 15]}>
              <Col span={24}>
                <Menu
                  defaultSelectedKeys={["allStaff"]}
                  onClick={handleSelectedStaffState}
                  selectedKeys={selectedStateStaff}
                  mode="horizontal"
                  items={items}
                />
              </Col>
              <Col span={24}>
                <div style={{ padding: "0 10px 0 10px", width: "100%" }}>
                  <Input
                    className="input-search-staff"
                    onChange={handleSearchValueChange}
                    placeholder="Nhập giá trị muốn tìm kiếm theo loại"
                    prefix={
                      <FontAwesomeIcon
                        icon={faSearch}
                        className="icon-search"
                      />
                    }
                  ></Input>
                </div>
              </Col>
            </Row>
          </div>
          <div className="content-staff-page">
            <Table
              style={{ marginLeft: "20px" }}
              columns={columns}
              dataSource={data}
              pagination={{
                pageSize: 4,
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
export default ContentStaffPage;
