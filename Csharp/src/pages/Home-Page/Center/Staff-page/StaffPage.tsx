import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col, Button, Input, Menu, Form, MenuProps, DatePickerProps, DatePicker } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCloudArrowUp, faMagnifyingGlass, faPlus } from "@fortawesome/free-solid-svg-icons";
import "./StaffPage.scss";
import useAction from "../../../../redux/useActions";
import { useNavigate } from "react-router-dom";
import ContentStaffPage from "../../../../components/ContentStaffPage/ContenStaffPage";
import { RouterLinks } from "../../../../const";
import useDebounce from "../../../../hooks/useDebounce";
import { staffService } from "../../../../untils/networks/services/staffService";
import { notification } from "../../../../components/notification";
import * as XLSX from "xlsx";
import dayjs from "dayjs";
const items: MenuProps["items"] = [
  {
    label: "Tất cả nhân viên",
    key: "allStaff",
  },
];
const StaffPage: React.FC = () => {
  const inputRef: any = React.useRef(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const actions = useAction();
  const selectedPage = useSelector((state: any) => state.staff.selectedPage);
  const [searchValue, setSearchValue] = useState("");
  const [searchEmail, setSearchEmail] = useState("");
  const searchValueDebounce = useDebounce<string>(searchValue, 500);
  useEffect(() => {
    dispatch(actions.StaffActions.setSearchValue(searchValueDebounce));
    dispatch(actions.StaffActions.loadData());
  }, [dispatch, actions.StaffActions, selectedPage, searchValueDebounce]);
  const staffs = useSelector((state: any) => state.staff.staffs);
  let valueStaffs: any[] = [];
  if (Array.isArray(staffs?.Data)) {
    valueStaffs = staffs.Data.map((staff: any) => {
      const date = new Date(staff?.CreatedAt);
      const formattedDate = date.toLocaleDateString("vi-VN");
      return {
        key: staff?.IdStaff,
        email: staff?.Email,
        nameStaff: staff?.Fullname,
        workShift: staff?.SelectedWorkShifts.map((w: any) => `${w.IdWorkShift},`)
          .join("")
          .slice(0, -1),
        address: staff?.Address,
        phoneNumber: staff?.PhoneNumber,
        createdAt: `${formattedDate}`,
      };
    });
  }

  const handleClickButtonAddStaff = () => {
    navigate(RouterLinks.ADD_STAFF_PAGE);
  };
  //tìm kiếm
  const handleSearchNameStaff = (e: any) => {
    dispatch(actions.StaffActions.setSelectedPage(1));
    setSearchValue(e.target.value);
  };
  const hanldeSearchEmail = (e: any) => {
    if (!e.target.value || e.target.value === "") {
      dispatch(actions.StaffActions.loadData());
    }
    setSearchEmail(e.target.value);
  };
  const ActionSearchEmail = async () => {
    try {
      dispatch(actions.StateAction.loadingState(true));
      let res = await staffService.getStaffByEmail(searchEmail);
      if (res.Status) {
        const data = res.Data;
        res.Data = [data];
        dispatch(actions.StaffActions.loadDataSuccess(res));
        dispatch(actions.StateAction.loadingState(false));
      } else {
        dispatch(actions.StaffActions.loadDataSuccess([]));
        dispatch(actions.StateAction.loadingState(false));
      }
    } catch (e: any) {
      dispatch(actions.StateAction.loadingState(false));
      console.log(e);
    }
  };

  const handleImportExcel = async (e: any) => {
    const files = e.target.files;
    if (files.length) {
      const file = files[0];
      const reader = new FileReader();
      reader.onload = async (e: any) => {
        const wb = XLSX.read(e.target.result);
        const sheet = wb.SheetNames;
        if (sheet.length) {
          const rows = XLSX.utils.sheet_to_json(wb.Sheets[sheet[0]]);
          if (Array.isArray(rows)) {
            const createManyStaff = rows.map((row: any) =>
              staffService.createStaff({
                ...row,
                WorkShifts: row?.WorkShifts ? row.WorkShifts.split(",").map(Number) : [],
                Birthday: row?.Birthday ? dayjs(row.Birthday, "DD/MM/YYYY") : 0,
              })
            );
            try {
              dispatch(actions.StateAction.loadingState(true));
              await Promise.all(createManyStaff);
              dispatch(actions.StaffActions.loadData());
              dispatch(actions.StateAction.loadingState(false));
            } catch (err: any) {
              dispatch(actions.StateAction.loadingState(false));
              notification({
                message: "Tạo nhân viên thất bại",
                title: "Thông báo",
                position: "top-right",
                type: "danger",
              });
              inputRef.current.value = null;
            }
          }
        }
      };
      reader.readAsArrayBuffer(file);
    }
  };
  return (
    <div className="staff-page">
      <Row gutter={[0, 15]}>
        <Col span={24}>
          <div className="title-button-staff-page">
            <div className="title-staff-page">Nhân viên</div>
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
              <Button
                onClick={handleClickButtonAddStaff}
                type="primary"
                className="button-add-staff"
              >
                <FontAwesomeIcon icon={faPlus} />
                <span> Thêm nhân viên</span>
              </Button>
              <div className="uploadFileImportExcel">
                <div className="custom-file">
                  <input
                    ref={inputRef}
                    hidden
                    type="file"
                    name="file"
                    className="custom-file-input"
                    id="inputGroupFile"
                    required
                    onChange={handleImportExcel}
                    accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                  />
                  <label className="custom-file-label" htmlFor="inputGroupFile">
                    <FontAwesomeIcon icon={faCloudArrowUp} />
                    <span style={{ marginLeft: "5px" }}>Nhập danh sách</span>
                  </label>
                </div>
              </div>
            </div>
          </div>
        </Col>

        <Col span={24}>
          <div className="container-staff-page">
            <div className="header-staff-page">
              <Row gutter={[15, 15]}>
                <Col span={24}>
                  <Menu defaultSelectedKeys={["allStaff"]} mode="horizontal" items={items} />
                </Col>

                <Col span={24}>
                  <Form className="form-css">
                    <Row gutter={[30, 20]}>
                      <Col span={8}>
                        <Form.Item
                          name="Id"
                          className="input-search-import-warehouse input-label-inline-border"
                        >
                          <label className="ant-form-item-label" htmlFor="">
                            Tên nhân viên
                          </label>
                          <Input
                            bordered={false}
                            placeholder="Nhập tên nhân viên"
                            onChange={handleSearchNameStaff}
                            prefix={
                              <FontAwesomeIcon icon={faMagnifyingGlass} className="icon-search" />
                            }
                          />
                        </Form.Item>
                      </Col>
                      <Col span={8}>
                        <Form.Item
                          name="time"
                          className="input-search-import-warehouse input-label-inline-border"
                        >
                          <label className="ant-form-item-label" htmlFor="">
                            Email
                          </label>
                          <Input
                            onChange={hanldeSearchEmail}
                            bordered={false}
                            placeholder="Nhập email"
                            prefix={
                              <FontAwesomeIcon
                                style={{ cursor: "pointer" }}
                                onClick={ActionSearchEmail}
                                icon={faMagnifyingGlass}
                                className="icon-search"
                              />
                            }
                          />
                        </Form.Item>
                      </Col>
                    </Row>
                  </Form>
                </Col>
              </Row>
            </div>
            <ContentStaffPage
              total={staffs?.TotalPage ? staffs?.TotalPage : 1}
              value={valueStaffs}
            />
          </div>
        </Col>
      </Row>
    </div>
  );
};
export default StaffPage;
