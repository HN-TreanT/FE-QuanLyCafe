import React, { useEffect, useState } from "react";
import { Row, Col, Input, Form } from "antd";
import { useSelector, useDispatch } from "react-redux";
import useAction from "../../redux/useActions";
import removeAccents from "../../const/RemoveAccent";
import Table, { ColumnsType } from "antd/es/table";
interface DataType {
  key: React.Key;
  IdMaterial: string;
  NameMaterial: string;
  Amount: Number;
}
const ModalMaterials: React.FC<{ visible: boolean }> = ({ visible }) => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const actions = useAction();
  const materials = useSelector((state: any) => state.material.materials);
  const selectedMaterials = useSelector(
    (state: any) => state.material.selectedMaterials
  );
  console.log(selectedMaterials.selectedRows);
  // const [selectedRowKeys, setSelectedRowKeys] = useState<any>(
  //   selectedMaterials?.selectedRowKeys
  // );
  const [valueMaterials, setValueMaterials] = useState(materials);
  const columns: ColumnsType<DataType> = [
    {
      title: "Mã nguyên liệu",
      dataIndex: "IdMaterial",
      render: (text) => <div style={{ color: "#1677ff" }}>{text}</div>,
    },
    {
      title: "Tên nguyên liệu",
      dataIndex: "NameMaterial",
    },
    {
      title: "Số lượng trong kho",
      dataIndex: "Amount",
    },
  ];
  const rowSelection = {
    onChange: (selectedRowKeys: React.Key[], selectedRows: DataType[]) => {
      console.log(selectedRows[selectedRows.length - 1]);
      const index = selectedRows.length - 1;
      const updateRows = selectedRows.map((row, i) => {
        if (i === index) {
          return { ...row, Amount: 0 };
        }
        return row;
      });
      dispatch(
        actions.MaterialActions.selectedMaterial({
          selectedRowKeys: selectedRowKeys,
          selectedRows: updateRows,
        })
      );
      //setSelectedRowKeys(selectedRowKeys);
    },
  };
  const handleSearchMaterial = (e: any) => {
    let filterMaterial: any[] = [];
    filterMaterial = valueMaterials.filter((material: any) => {
      const newMaterial = removeAccents(
        material.NameMaterial
      ).toLocaleLowerCase();
      const searchMaterial = removeAccents(e.target.value).toLocaleLowerCase();
      return newMaterial?.includes(searchMaterial);
    });
    if (e.target.value) {
      setValueMaterials(filterMaterial);
    } else {
      setValueMaterials(materials);
    }
  };
  //back
  return (
    <Row gutter={[10, 15]}>
      <Col span={24}>
        <Form form={form}>
          <Form.Item>
            <Input.Search
              onChange={handleSearchMaterial}
              placeholder="Tìm kiếm tên nguyên liệu "
            ></Input.Search>
          </Form.Item>
        </Form>
      </Col>
      <Col span={24}>
        <Table
          rowSelection={{
            type: "checkbox",
            ...rowSelection,
            selectedRowKeys: selectedMaterials?.selectedRowKeys,
          }}
          columns={columns}
          dataSource={
            Array.isArray(valueMaterials)
              ? valueMaterials
                  .map((material: any) => {
                    return {
                      key: material?.IdMaterial ? material?.IdMaterial : "",
                      IdMaterial: material?.IdMaterial
                        ? material?.IdMaterial
                        : "",
                      NameMaterial: material?.NameMaterial
                        ? material?.NameMaterial
                        : "",
                      Amount: material?.Amount ? material?.Amount : 0,
                    };
                  })
                  .sort((a, b) => {
                    const aIsSelected =
                      selectedMaterials.selectedRowKeys?.includes(a.key);
                    const bIsSelected =
                      selectedMaterials.selectedRowKeys?.includes(b.key);

                    if (aIsSelected && !bIsSelected) {
                      return -1;
                    }

                    if (!aIsSelected && bIsSelected) {
                      return 1;
                    }

                    return 0;
                  })
              : []
          }
          pagination={{
            pageSize: 5,
            showSizeChanger: false,
            hideOnSinglePage: true,
          }}
        />
      </Col>
    </Row>
  );
};
export default ModalMaterials;
