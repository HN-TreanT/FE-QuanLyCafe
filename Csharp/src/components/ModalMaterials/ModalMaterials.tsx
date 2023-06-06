import React, { useEffect, useState } from "react";
import { Row, Col, Input, Form } from "antd";
import { useSelector, useDispatch } from "react-redux";
import useAction from "../../redux/useActions";
import Table, { ColumnsType } from "antd/es/table";
import useDebounce from "../../hooks/useDebounce";
interface DataType {
  key: React.Key;
  IdMaterial: string;
  NameMaterial: string;
  Amount: Number;
  Unit: string;
}
const ModalMaterials: React.FC<{ visible: boolean }> = ({ visible }) => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const actions = useAction();
  const materials = useSelector((state: any) => state.material.materials);
  const loading = useSelector((state: any) => state.state.loadingState);
  const [searchValue, setSearchValue] = useState("");
  const searchValueDebounce = useDebounce<string>(searchValue, 500);
  const selectedMaterials = useSelector((state: any) => state.material.selectedMaterials);
  const selectedPage = useSelector((state: any) => state.material.selectedPage);
  useEffect(() => {
    dispatch(actions.MaterialActions.setSearchValue(searchValueDebounce));
    dispatch(actions.MaterialActions.loadData());
  }, [dispatch, actions.MaterialActions, selectedPage, searchValueDebounce]);

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
    {
      title: "",
      dataIndex: "Unit",
    },
  ];
  const rowSelection = {
    onChange: (selectedRowKeys: React.Key[], selectedRows: DataType[]) => {
      if (!selectedMaterials.selectedRows || !selectedMaterials.selectedRowKeys) {
        selectedMaterials.selectedRows = [];
        selectedMaterials.selectedRowKeys = [];
      }
      const updateSelectedRowsKey = selectedMaterials.selectedRowKeys
        .concat(selectedRowKeys)
        .filter((value: any, index: any, self: string | any[]) => self.indexOf(value) === index);
      const updateSelectedRows = selectedMaterials.selectedRows
        .concat(selectedRows)
        .filter((value: any, index: any, self: any[]) => {
          const key = value.key;
          const isDuplicate = self.findIndex((item) => item.key === key) !== index;
          return !isDuplicate;
        });
      dispatch(
        actions.MaterialActions.selectedMaterial({
          selectedRowKeys: updateSelectedRowsKey,
          selectedRows: updateSelectedRows.map((row: any) => {
            return {
              ...row,
              Amount: 0,
            };
          }),
        })
      );
    },
  };
  const handleSearchMaterial = (e: any) => {
    dispatch(actions.MaterialActions.setSelectedPage(1));
    setSearchValue(e.target.value);
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
            Array.isArray(materials?.Data)
              ? materials.Data.map((material: any) => {
                  return {
                    key: material?.IdMaterial ? material?.IdMaterial : "",
                    IdMaterial: material?.IdMaterial ? material?.IdMaterial : "",
                    NameMaterial: material?.NameMaterial ? material?.NameMaterial : "",
                    Amount: material?.Amount ? material?.Amount.toFixed(2) : 0,
                    Unit: material?.Unit ? material?.Unit : "",
                  };
                }).sort((a: { key: any }, b: { key: any }) => {
                  const aIsSelected = selectedMaterials.selectedRowKeys?.includes(a.key);
                  const bIsSelected = selectedMaterials.selectedRowKeys?.includes(b.key);

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
            current: selectedPage ? selectedPage : 1,
            pageSize: 5,
            total: materials?.TotalPage ? materials.TotalPage : 1,
            showSizeChanger: false,
            hideOnSinglePage: true,
            onChange: (page) => {
              dispatch(actions.MaterialActions.setSelectedPage(page));
            },
          }}
          loading={loading}
        />
      </Col>
    </Row>
  );
};
export default ModalMaterials;
