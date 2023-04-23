import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Row, Col, Input, Button, Modal, Form, TimePicker } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen } from "@fortawesome/free-solid-svg-icons";
import useAction from "../../../../../redux/useActions";
import ContentStaffPage from "../../../../../components/ContentStaffPage/ContenStaffPage";
import Spinn from "../../../../../components/Spinning/Spinning";
import "./DetailWorkShift.scss";
import { RouterLinks } from "../../../../../const";
import { useForm } from "antd/es/form/Form";
import { notification } from "../../../../../components/notification";
import { workshiftService } from "../../../../../untils/networks/services/workshiftService";
import dayjs from "dayjs";
const DetailWorkShift: React.FC = () => {
  const navigate = useNavigate();
  const actions = useAction();
  const dispatch = useDispatch();
  const [form] = useForm();
  const detailWorkShift = useSelector(
    (state: any) => state.workshift.detailWorkShift
  );
  const [isOpenModal, setIsOpenModal] = useState(false);
  const loading = useSelector((state: any) => state.state.loadingState);
  const handleBack = () => {
    navigate(RouterLinks.WORKSHIFT_PAGE);
  };
  const valueStaff = detailWorkShift.SelectedWorkShifts.map((sws: any) => {
    const date = new Date(sws?.IdStaffNavigation?.CreatedAt);
    const formattedDate = date.toLocaleDateString("vi-VN");
    return {
      key: sws?.IdStaffNavigation?.IdStaff,
      email: sws?.IdStaffNavigation?.Email,
      nameStaff: sws?.IdStaffNavigation?.Fullname,
      workShift: sws?.IdWorkShift,
      address: sws?.IdStaffNavigation?.Address,
      phoneNumber: sws?.IdStaffNavigation?.PhoneNumber,
      createdAt: `${formattedDate}`,
    };
  });
  const handleClickButtonEdit = () => {
    setIsOpenModal(true);
  };
  const handleValueChange = () => {};
  const hadleUpdateWorkShift = async () => {
    console.log(form.getFieldsValue());
    try {
      let dateArrivalTime = new Date(form.getFieldsValue().ArrivalTime);
      let dateTimeOn = new Date(form.getFieldsValue().TimeOn);
      const data = {
        ArrivalTime: dateArrivalTime.toLocaleTimeString("vi-VN", {
          hour12: false,
        }),
        TimeOn: dateTimeOn.toLocaleTimeString("vi-VN", { hour12: false }),
      };
      dispatch(actions.StateAction.loadingState(true));
      let response = await workshiftService.updateWorkShift(
        detailWorkShift.IdWorkShift,
        data
      );
      if (response.Status) {
        dispatch(actions.StateAction.loadingState(false));
        dispatch(actions.WorkshiftActions.loadData());
        notification({
          message: "update workshift success ",
          title: "Thông báo",
          position: "top-right",
          type: "success",
        });
        navigate(RouterLinks.WORKSHIFT_PAGE);
        setIsOpenModal(false);
      } else {
        notification({
          message: response.Message,
          title: "Thông báo",
          position: "top-right",
          type: "danger",
        });
        dispatch(actions.StateAction.loadingState(false));
        form.resetFields();
        setIsOpenModal(false);
      }
    } catch (err) {
      notification({
        message: "Server lỗi ",
        title: "Thông báo",
        position: "top-right",
        type: "danger",
      });
      dispatch(actions.StateAction.loadingState(false));
      setIsOpenModal(false);
      form.resetFields();
    }
  };
  return (
    <div className="detail-workshift-page">
      {loading ? <Spinn /> : ""}
      <Modal
        title="Chỉnh sửa thông tin ca làm"
        open={isOpenModal}
        onCancel={() => setIsOpenModal(false)}
        footer={[
          <Button
            key="back"
            onClick={() => {
              setIsOpenModal(false);
              form.resetFields();
            }}
          >
            Hủy
          </Button>,
          <Button key="submit" type="primary" onClick={hadleUpdateWorkShift}>
            Lưu thay đổi
          </Button>,
        ]}
      >
        <Form form={form} onValuesChange={handleValueChange}>
          <Row gutter={[15, 15]}>
            <Col span={24}>
              <Form.Item
                label="ArrivalTime"
                name="ArrivalTime"
                initialValue={dayjs(detailWorkShift?.ArrivalTime, "HH:mm:ss")}
              >
                <TimePicker style={{ width: "100%" }} />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item
                label="TimeOn"
                name="TimeOn"
                initialValue={dayjs(detailWorkShift?.TimeOn, "HH:mm:ss")}
              >
                <TimePicker style={{ width: "100%" }} />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>
      <span onClick={handleBack} style={{ cursor: "pointer", color: "#666" }}>
        <ArrowLeftOutlined style={{ padding: "3px" }} />
        <span>Ca làm</span>
      </span>
      <Row gutter={[0, 15]}>
        <Col span={21}>
          <div className="title-button-detail-workshift-page">
            <div className="title-detail-workshift-page">
              {`Ca ${detailWorkShift?.IdWorkShift} : ${detailWorkShift?.ArrivalTime} - ${detailWorkShift.TimeOn}`}
            </div>
          </div>
        </Col>
        <Col span={3}>
          <Button onClick={handleClickButtonEdit} type="primary">
            <FontAwesomeIcon icon={faPen} />
            <span style={{ paddingLeft: "5px" }}> Chỉnh sửa ca làm</span>
          </Button>
        </Col>
        <ContentStaffPage value={valueStaff} />
      </Row>
    </div>
  );
};
export default DetailWorkShift;
