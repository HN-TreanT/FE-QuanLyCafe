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
import { PlusOutlined, ArrowLeftOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import useAction from "../../../../../redux/useActions";
import "./AddStaffPage.scss";
import { RouterLinks } from "../../../../../const";
const AddStaffPage: React.FC = () => {
  const emailRegex =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const actions = useAction();
  const [form] = Form.useForm();
  const [isDisabled, setIsDisabled] = useState(true);
  const workshifts = useSelector((state: any) => state.workshift.workshifts);
  const staffs = useSelector((state: any) => state.staff.staffs);
  useEffect(() => {
    dispatch(actions.WorkshiftActions.loadData());
  }, [dispatch, actions.WorkshiftActions]);
  const handleChange = () => {
    dispatch(
      actions.StaffActions.setInfoStaffCreate({
        ...form.getFieldsValue(),
        PhoneNumber: form.getFieldsValue().PhoneNumber?.toString(),
      })
    );

    if (
      form.getFieldsValue().PhoneNumber &&
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
  const handleAddStaff = () => {
    dispatch(actions.StaffActions.createStaff());
    navigate(RouterLinks.STAFF_PAGE);
  };
  const handleCancleStaff = () => {
    navigate(RouterLinks.STAFF_PAGE);
  };
  return (
    <div className="add-staff-page">
      <Form form={form} onValuesChange={handleChange} layout="vertical">
        <span onClick={handleBack} style={{ cursor: "pointer", color: "#666" }}>
          <ArrowLeftOutlined style={{ padding: "3px" }} />
          <span>Quay lại danh sách nhân viên</span>
        </span>
        <Row gutter={[0, 25]}>
          <Col span={24}>
            <div className="tittle-add-staff-page">Thêm mới nhân viên</div>
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
            <div className="content-add-staff-page">
              <div className="inner-add-staff-page">
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
                    >
                      <Input placeholder="Nhập tên nhân viên"></Input>
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item
                      name="Email"
                      label="E-mail"
                      rules={[
                        {
                          type: "email",
                          message: "Đây không phải là email!",
                        },
                        {
                          required: true,
                          message: "Vui lòng nhập email!",
                        },
                        {
                          validator: async (_, value) => {
                            let check = false;
                            staffs.forEach((item: any) => {
                              if (value === item?.Email) {
                                check = true;
                                setIsDisabled(true);
                              }
                            });
                            console.log(value);
                            if (check) {
                              throw new Error("Email đã tồn tại ");
                            }
                          },
                        },
                      ]}
                    >
                      <Input />
                    </Form.Item>
                  </Col>

                  <Col span={10}>
                    <Form.Item
                      rules={[
                        {
                          required: true,
                          message: "Vui lòng nhập số điện thoại!",
                        },
                        {
                          validator: async (_, value) => {
                            let check = false;
                            staffs.forEach((item: any) => {
                              if (value?.toString() === item?.PhoneNumber) {
                                check = true;
                                setIsDisabled(true);
                              }
                            });
                            if (check) {
                              throw new Error("số điện thoại đã tồn tại ");
                            }
                          },
                        },
                      ]}
                      name="PhoneNumber"
                      label="Số điện thoai"
                    >
                      <InputNumber
                        style={{ width: "100%" }}
                        placeholder="Nhập số điện thoại"
                      ></InputNumber>
                    </Form.Item>
                  </Col>
                  <Col span={10}>
                    <Form.Item name="Address" label="Địa chỉ">
                      <Input placeholder="Nhập địa chỉ"></Input>
                    </Form.Item>
                  </Col>
                  <Col span={4}>
                    <Form.Item
                      name="Gender"
                      label="Giới tính"
                      initialValue={"Nam"}
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
                    <Form.Item name="Birthday" label="Ngày sinh">
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
                    >
                      <InputNumber
                        style={{ width: "100%" }}
                        min={0}
                        placeholder="Nhập lương"
                      ></InputNumber>
                    </Form.Item>
                  </Col>
                  <Col span={8}>
                    <Form.Item
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
                        onChange={handleChange}
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
              onClick={handleAddStaff}
              type="primary"
              style={{ width: "100px" }}
            >
              Lưu
            </Button>
          </Col>
        </Row>
      </Form>
    </div>
  );
};
export default AddStaffPage;
