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
import { useDispatch, useSelector } from "react-redux";
import useAction from "../../redux/useActions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { ColumnsType } from "antd/es/table";
import { useNavigate } from "react-router-dom";
import { RouterLinks } from "../../const";
import { productServices } from "../../untils/networks/services/productService";

import { StaffSupport } from "../../const/StaffSupport";
import { staffService } from "../../untils/networks/services/staffService";
import Spinn from "../Spinning/Spinning";
import { notification } from "../notification";
const items: MenuProps["items"] = [
  {
    label: "Tất cả nhân viên",
    key: "allStaff",
  },
];
interface DataType {
  email: string;
  nameStaff: string;
  workShift: string;
  address: string;
  phoneNumber: string;
  createdAt: string;
}
const ContentStaffPage: React.FC<any> = ({ value }) => {
  const navigate = useNavigate();
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
      title: "Ca làm",
      dataIndex: "workShift",
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
  const loading = useSelector((state: any) => state.state.loadingState);
  const [valueStaffs, setValueStaffs] = useState(value);
  useEffect(() => {
    setValueStaffs(value);
  }, [value]);
  //click row table
  const handleRowClick = async (record: any) => {
    try {
      dispatch(actions.StateAction.loadingState(true));
      const response = await staffService.getStaffById(record.key);
      if (response.Status) {
        //  dispatch(actions.StaffActions.seletedStaff(record.key));
        dispatch(actions.StaffActions.setDetailStaff(response.Data));
        navigate(RouterLinks.DETAIL_STAFF_PAGE);
        dispatch(actions.StateAction.loadingState(false));
      } else {
        notification({
          message: "Not found staff",
          title: "Thông báo",
          position: "top-right",
          type: "danger",
        });
      }
    } catch (err: any) {
      console.log(err);
    }
  };
  //tìm kiếm
  const handleSearchValueChange = (e: any) => {
    const filterStaffs = StaffSupport.SearchStaff({
      searchValue: e.target.value,
      staffs: value,
    });
    if (e.target.value) {
      setValueStaffs(filterStaffs);
    } else {
      setValueStaffs(value);
    }
  };

  return (
    <>
      {loading ? <Spinn /> : " "}
      <Col span={24}>
        <div className="container-staff-page">
          <div className="header-staff-page">
            <Row gutter={[15, 15]}>
              <Col span={24}>
                <Menu
                  defaultSelectedKeys={["allStaff"]}
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
              dataSource={valueStaffs}
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
export default ContentStaffPage;
