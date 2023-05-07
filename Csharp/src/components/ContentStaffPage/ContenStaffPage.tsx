import { Table } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import useAction from "../../redux/useActions";
import { ColumnsType } from "antd/es/table";
import { useNavigate } from "react-router-dom";
import { RouterLinks } from "../../const";
import { staffService } from "../../untils/networks/services/staffService";
import { notification } from "../notification";

interface DataType {
  email: string;
  nameStaff: string;
  workShift: string;
  address: string;
  phoneNumber: string;
  createdAt: string;
}
const ContentStaffPage: React.FC<any> = ({ total, value }) => {
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

  return (
    <>
      <div className="content-staff-page">
        <Table
          loading={loading}
          style={{ marginLeft: "20px" }}
          columns={columns}
          dataSource={valueStaffs}
          pagination={{
            total: total,
            pageSize: 5,
            showSizeChanger: false,
            hideOnSinglePage: true,
            onChange: (page) => {
              dispatch(actions.StaffActions.setSelectedPage(page));
            },
          }}
          onRow={(record: DataType) => ({
            onClick: () => handleRowClick(record),
          })}
        />
      </div>
    </>
  );
};
export default ContentStaffPage;
