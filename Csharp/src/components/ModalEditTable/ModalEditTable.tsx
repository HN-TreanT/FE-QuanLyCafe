import React, { useEffect, useState } from "react";
import { Button, Form, InputNumber, Modal, Select } from "antd";
import { useDispatch, useSelector } from "react-redux";
import useAction from "../../redux/useActions";
import { tableFoodService } from "../../untils/networks/services/tableFoodService";
import { notification } from "../notification";

const ModalEditTable: React.FC<any> = ({ isOpen, data }) => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const actions = useAction();
  const [isOpenModalEdit, SetIsOpenModalEdit] = useState(isOpen);
  const [tableSeleted, setTableSelected] = useState<any>(data);
  useEffect(() => {
    SetIsOpenModalEdit(isOpen);
    setTableSelected(data);
    form.setFieldsValue(tableSeleted);
  }, [data, isOpen, form, tableSeleted]);
  const handleDeleteTable = async () => {
    SetIsOpenModalEdit(false);
    try {
      console.log(tableSeleted.IdTable);
      dispatch(actions.StateAction.loadingState(true));
      let response = await tableFoodService.deleteTableFood(
        tableSeleted.IdTable
      );
      if (response.Status) {
        dispatch(actions.TableFoodActions.loadData());
        notification({
          message: "delete success",
          title: "Thông báo",
          position: "top-right",
          type: "success",
        });
      } else {
        notification({
          message: response.Message,
          title: "Thông báo",
          position: "top-right",
          type: "danger",
        });
      }
      dispatch(actions.StateAction.loadingState(false));
    } catch (err: any) {
      notification({
        message: "server not response ",
        title: "Thông báo",
        position: "top-right",
        type: "danger",
      });
    }
  };
  const handleUpdate = async () => {
    SetIsOpenModalEdit(false);
    try {
      console.log(tableSeleted.IdTable);
      dispatch(actions.StateAction.loadingState(true));
      let response = await tableFoodService.updateTabelFodd(
        tableSeleted.IdTable,
        form.getFieldsValue()
      );
      if (response.Status) {
        dispatch(actions.TableFoodActions.loadData());
        notification({
          message: "delete success",
          title: "Thông báo",
          position: "top-right",
          type: "success",
        });
      } else {
        notification({
          message: response.Message,
          title: "Thông báo",
          position: "top-right",
          type: "danger",
        });
      }
      dispatch(actions.StateAction.loadingState(false));
    } catch (err: any) {
      notification({
        message: "server not response ",
        title: "Thông báo",
        position: "top-right",
        type: "danger",
      });
    }
  };
  return (
    <Modal
      title="Sửa bàn ăn"
      open={isOpenModalEdit}
      onCancel={() => {
        form.resetFields();
        SetIsOpenModalEdit(false);
      }}
      footer={[
        <Button danger key="delete" onClick={handleDeleteTable}>
          Xóa bàn ăn
        </Button>,
        <Button key="submit" type="primary" onClick={handleUpdate}>
          Lưu thay đổi
        </Button>,
      ]}
    >
      <Form layout="horizontal" form={form}>
        <Form.Item initialValue={tableSeleted?.Name} label="Số bàn" name="Name">
          <InputNumber
            value={tableSeleted?.Name}
            style={{ width: "100%" }}
          ></InputNumber>
        </Form.Item>
        <Form.Item
          initialValue={tableSeleted?.Status}
          label="Trạng thái"
          name="Status"
        >
          <Select
            options={[
              {
                label: "Đang có người",
                value: 1,
              },
              {
                label: "Còn trống",
                value: 0,
              },
            ]}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};
export default ModalEditTable;
