import React, { useEffect, useState } from "react";
import { Button, Form, InputNumber, Modal, Select } from "antd";
import { useDispatch, useSelector } from "react-redux";
import useAction from "../../redux/useActions";

const ModalEditTable: React.FC<any> = ({ isOpen, data }) => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const [isOpenModalEdit, SetIsOpenModalEdit] = useState(isOpen);
  const [tableSeleted, setTableSelected] = useState(data);
  useEffect(() => {
    SetIsOpenModalEdit(isOpen);
    setTableSelected(data);
  }, [data, isOpen]);
  //   const tableSeleted = useSelector(
  //     (state: any) => state.tablefood.tableSelected
  //   );
  console.log("check -->", tableSeleted);
  const handleDeleteTable = () => {
    SetIsOpenModalEdit(false);
  };
  const handleUpdate = () => {
    SetIsOpenModalEdit(false);
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
        <Button key="delete" onClick={handleDeleteTable}>
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
