import React, { useEffect, useState } from "react";
import {
  Row,
  Col,
  Button,
  Input,
  Form,
  Select,
  DatePicker,
  InputNumber,
} from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import useAction from "../../../../../redux/useActions";
import { RouterLinks } from "../../../../../const";
import dayjs from "dayjs";
import "./DetailStaffPage.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { notification } from "../../../../../components/notification";
import { staffService } from "../../../../../untils/networks/services/staffService";
import Spinn from "../../../../../components/Spinning/Spinning";
const DetailStaffPage: React.FC = () => {
  const emailRegex =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const actions = useAction();
  const [form] = Form.useForm();
  const [isDisabled, setIsDisabled] = useState(true);
  const detailStaff = useSelector((state: any) => state.staff.detailStaff);
  const workshifts = useSelector((state: any) => state.workshift.workshifts);
  const loading = useSelector((state: any) => state.state.loadingState);
  useEffect(() => {
    dispatch(actions.WorkshiftActions.loadData());
  }, [dispatch, actions.WorkshiftActions]);
  console.log(window.location.pathname);
  if (window.location.pathname.includes(RouterLinks.STAFF_PAGE)) {
    dispatch(actions.StateAction.selectedMenuItem("staff"));
  }
  const handleChange = () => {
    console.log(form.getFieldsValue());
    dispatch(
      actions.StaffActions.setInfoStaffCreate({
        ...form.getFieldsValue(),
        PhoneNumber: form.getFieldsValue().PhoneNumber?.toString(),
      })
    );
    if (
      form.getFieldsValue().Fullname &&
      form.getFieldsValue().Email &&
      form.getFieldsValue().Salary &&
      form.getFieldsValue().WorkShifts &&
      form.getFieldsValue().WorkShifts.length !== 0
    ) {
      if (!emailRegex.test(form.getFieldsValue().Email)) {
        setIsDisabled(true);
      } else {
        setIsDisabled(false);
      }
    } else {
      setIsDisabled(true);
    }
  };
  const handleBack = () => {
    navigate(RouterLinks.STAFF_PAGE);
  };
  const handleUpdateStaff = async () => {
    await dispatch(actions.StaffActions.handleUpdateStaff());
    navigate(RouterLinks.STAFF_PAGE);
  };
  const handleCancleStaff = () => {
    navigate(RouterLinks.STAFF_PAGE);
  };
  const handleDeleteStaff = async () => {
    try {
      dispatch(actions.StateAction.loadingState(true));
      const resposnse = await staffService.deleteStaff(detailStaff.IdStaff);
      if (resposnse.Status) {
        dispatch(actions.StateAction.loadingState(false));
        dispatch(actions.StaffActions.loadData());
        navigate(RouterLinks.STAFF_PAGE);
        notification({
          message: "delete success",
          title: "Thông báo",
          position: "top-right",
          type: "success",
        });
      } else {
        notification({
          message: "delete fail",
          title: "Thông báo",
          position: "top-right",
          type: "danger",
        });
      }
    } catch (err: any) {
      notification({
        message: "server error",
        title: "Thông báo",
        position: "top-right",
        type: "danger",
      });
    }
  };

  return (
    <div className="detail-staff-page">
      {loading ? <Spinn /> : ""}
      <Form form={form} onValuesChange={handleChange} layout="vertical">
        <span onClick={handleBack} style={{ cursor: "pointer", color: "#666" }}>
          <ArrowLeftOutlined style={{ padding: "3px" }} />
          <span>Quay lại danh sách nhân viên</span>
        </span>
        <Row gutter={[0, 25]}>
          <Col span={21}>
            <div className="tittle-detail-staff-page">{`Thông tin nhân viên #${detailStaff?.IdStaff}`}</div>
          </Col>
          <Col span={3}>
            <Button
              onClick={handleDeleteStaff}
              style={{ marginTop: "7px" }}
              danger
            >
              <FontAwesomeIcon style={{ marginRight: "5px" }} icon={faTrash} />
              Xóa nhân viên
            </Button>
          </Col>

          <Col span={24}>
            <div
              style={{
                border: "0.5px solid black",
                opacity: "0.05",
              }}
            ></div>
          </Col>
          <Col span={6}>
            <div style={{ fontSize: "1rem", fontWeight: "500" }}>
              Thông tin tài khoản
            </div>
            <p>Nhập đầy đủ thông tin của nhân viên</p>
          </Col>
          <Col span={2}></Col>
          <Col span={16}>
            <div className="content-detail-staff-page">
              <div className="inner-detail-staff-page">
                <Row gutter={[10, 10]}>
                  <Col span={12}>
                    <Form.Item
                      rules={[
                        {
                          required: true,
                          message: "Tên nhân viên không được bỏ trống",
                        },
                      ]}
                      name="Fullname"
                      label="Tên nhân viên"
                      initialValue={detailStaff?.Fullname}
                    >
                      <Input placeholder="Nhập tên nhân viên"></Input>
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item
                      name="Email"
                      label="E-mail"
                      initialValue={detailStaff?.Email}
                      shouldUpdate={(prevValues, curValues) =>
                        curValues.Email === prevValues.Email
                      }
                      rules={[
                        {
                          type: "email",
                          message: "Đây không phải là email",
                        },
                        {
                          required: true,
                          message: "Hãy nhập email của bạn",
                        },
                      ]}
                    >
                      <Input />
                    </Form.Item>
                  </Col>

                  <Col span={10}>
                    <Form.Item
                      name="PhoneNumber"
                      label="Số điện thoai"
                      initialValue={detailStaff?.PhoneNumber}
                    >
                      <InputNumber
                        style={{ width: "100%" }}
                        placeholder="Nhập số điện thoại"
                      ></InputNumber>
                    </Form.Item>
                  </Col>
                  <Col span={10}>
                    <Form.Item
                      name="Address"
                      label="Địa chỉ"
                      initialValue={detailStaff?.Address}
                    >
                      <Input placeholder="Nhập địa chỉ"></Input>
                    </Form.Item>
                  </Col>
                  <Col span={4}>
                    <Form.Item
                      name="Gender"
                      label="Giới tính"
                      initialValue={detailStaff?.Gender}
                    >
                      <Select
                        options={[
                          { value: "Name", label: "Nam" },
                          { value: "Nu", label: "Nữ" },
                        ]}
                      ></Select>
                    </Form.Item>
                  </Col>
                  <Col span={8}>
                    <Form.Item
                      initialValue={dayjs(detailStaff?.Birthday, "YYYY/MM/DD")}
                      name="Birthday"
                      label="Ngày sinh"
                    >
                      <DatePicker style={{ width: "100%" }} />
                    </Form.Item>
                  </Col>
                  <Col span={8}>
                    <Form.Item
                      rules={[
                        {
                          required: true,
                          message: "Hãy nhập lương",
                        },
                      ]}
                      name="Salary"
                      label="Lương"
                      initialValue={detailStaff?.Salary}
                    >
                      <InputNumber
                        addonAfter="VNĐ"
                        style={{ width: "100%" }}
                        placeholder="Nhập lương"
                      ></InputNumber>
                    </Form.Item>
                  </Col>
                  <Col span={8}>
                    <Form.Item
                      initialValue={detailStaff?.SelectedWorkShifts.map(
                        (ws: any) => {
                          return ws.IdWorkShift;
                        }
                      )}
                      rules={[
                        {
                          required: true,
                          message: "Ca làm không được bỏ trống",
                        },
                      ]}
                      name="WorkShifts"
                      label="Ca làm"
                    >
                      <Select
                        mode="multiple"
                        size="middle"
                        placeholder="Hãy chọn ca làm"
                        style={{ width: "100%" }}
                        options={
                          Array.isArray(workshifts)
                            ? workshifts.map((ws: any) => {
                                return {
                                  value: ws.IdWorkShift,
                                  label: `Ca ${ws.IdWorkShift}`,
                                };
                              })
                            : []
                        }
                      />
                    </Form.Item>
                  </Col>
                </Row>
              </div>
            </div>
          </Col>
          <Col span={24}>
            <div
              style={{
                border: "0.5px solid black",
                opacity: "0.05",
              }}
            ></div>
          </Col>
          <Col span={19}></Col>
          <Col span={5}>
            <Button
              onClick={handleCancleStaff}
              danger
              style={{ width: "100px", marginRight: "10px" }}
            >
              Hủy
            </Button>
            <Button
              disabled={isDisabled}
              onClick={handleUpdateStaff}
              type="primary"
              style={{ width: "100px" }}
            >
              Lưu thay đổi
            </Button>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default DetailStaffPage;
