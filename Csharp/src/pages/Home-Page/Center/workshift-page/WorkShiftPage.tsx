import React, { useEffect, useState } from "react";
import { Row, Col, Button, Modal, Form, Input, TimePicker } from "antd";
import { useDispatch, useSelector } from "react-redux";
import useAction from "../../../../redux/useActions";
import "./WorkShiftPage.scss";
import ContentWorkShift from "./ContentWorkShift/ContentWorkShift";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { notification } from "../../../../components/notification";
import { workshiftService } from "../../../../untils/networks/services/workshiftService";
import Spinn from "../../../../components/Spinning/Spinning";
const WorkShiftPage: React.FC = () => {
  const dispatch = useDispatch();
  const actions = useAction();
  const [form] = Form.useForm();
  const workshifts = useSelector((state: any) => state.workshift.workshifts);
  const [isOpenModal, setIsOpenModal] = useState(false);
  useEffect(() => {
    dispatch(actions.WorkshiftActions.loadData());
  }, [dispatch, actions.WorkshiftActions]);
  const hadleAddWorkShift = async () => {
    try {
      let dateArrivalTime = new Date(form.getFieldsValue().ArrivalTime);
      let dateTimeOn = new Date(form.getFieldsValue().timeOn);
      dispatch(actions.StateAction.loadingState(true));
      let response = await workshiftService.createWorkShift({
        IdWorkShift: parseInt(form.getFieldsValue().IdWorkShift, 10),
        ArrivalTime: dateArrivalTime.toLocaleTimeString("vi-VN", {
          hour12: false,
        }),
        timeOn: dateTimeOn.toLocaleTimeString("vi-VN", { hour12: false }),
      });
      if (response.Status) {
        dispatch(actions.WorkshiftActions.loadData());
        dispatch(actions.StateAction.loadingState(false));
        notification({
          message: "create work success ",
          title: "Thông báo",
          position: "top-right",
          type: "success",
        });
        form.resetFields();
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
    } catch (err: any) {
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
  const handleClickAddButton = () => {
    setIsOpenModal(true);
  };
  const handleValueChange = () => {};
  return (
    <div className="workshift-page">
      <Modal
        title="Thêm ca làm"
        open={isOpenModal}
        onCancel={() => {
          setIsOpenModal(false);
          form.resetFields();
        }}
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
          <Button key="submit" type="primary" onClick={hadleAddWorkShift}>
            Thêm
          </Button>,
        ]}
      >
        <Form form={form} onValuesChange={handleValueChange}>
          <Row gutter={[15, 15]}>
            <Col span={24}>
              <Form.Item
                name="IdWorkShift"
                label="Ca làm"
                rules={[
                  {
                    required: true,
                    message: "Hãy nhập ca làm",
                  },
                ]}
              >
                <Input
                  type="number"
                  onKeyDown={(e) => {
                    if (e.key === "-" || e.key === "e" || e.key === "+" || e.key === "E") {
                      e.preventDefault();
                    }
                  }}
                ></Input>
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item
                name="ArrivalTime"
                label="Thời gian bắt đầu"
                rules={[
                  {
                    required: true,
                    message: "Hãy nhập thời gian bắt đầu",
                  },
                ]}
              >
                <TimePicker />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item
                name="timeOn"
                label="Thời gian  kết thúc"
                rules={[
                  {
                    required: true,
                    message: "Hãy nhập thời gian kết thúc",
                  },
                ]}
              >
                <TimePicker />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>
      <Row gutter={[0, 15]}>
        <Col span={24}>
          <div className="title-button-workshift-page">
            <div className="title-workshift-page">Ca làm</div>
            <Button onClick={handleClickAddButton} type="primary" className="button-add-workshift">
              <FontAwesomeIcon icon={faPlus} />
              <span> Thêm ca làm</span>
            </Button>
          </div>
        </Col>
        <ContentWorkShift
          value={
            Array.isArray(workshifts)
              ? workshifts.map((ws: any) => {
                  return {
                    key: ws?.IdWorkShift,
                    workShift: ws?.IdWorkShift,
                    ArrivalTime: ws?.ArrivalTime,
                    TimeOn: ws?.TimeOn,
                    count: ws?.SelectedWorkShifts.length,
                  };
                })
              : []
          }
        />
      </Row>
    </div>
  );
};
export default WorkShiftPage;
