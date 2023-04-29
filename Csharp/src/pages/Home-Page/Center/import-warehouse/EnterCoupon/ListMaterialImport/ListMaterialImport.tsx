import React, { useState, useEffect } from "react";
import { Table, Row, Col, Button, Modal } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { ColumnsType } from "antd/es/table";
import useAction from "../../../../../../redux/useActions";
import { useDispatch, useSelector } from "react-redux";
interface DataType {
  key: string;
  NameMaterial: string;
  IdMaterial: string;
  Amount: string;
  Price: string;
  NameProvider: string;
  PhoneProvider: Number;
}

const ListMaterailImport: React.FC<any> = ({ data }) => {
  console.log("check data-->", data);
  const dispatch = useDispatch();
  const actions = useAction();
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
      title: "Số lượng",
      dataIndex: "Amount",
    },
    {
      title: "Giá nhập",
      dataIndex: "Price",
    },
    {
      title: "Tên nhà cung cấp",
      dataIndex: "ProviderName",
    },
    {
      title: "",
      dataIndex: "removeCoupon",
      render: (text: any, record: DataType) => (
        <div
          onClick={(e) => handleRemoveCoupon(e, record)}
          className="table-delete"
          style={{ cursor: "pointer" }}
        >
          X
        </div>
      ),
    },
  ];
  const selectedMaterials = useSelector(
    (state: any) => state.importgoods.materialSelected
  );
  console.log("check ", selectedMaterials);
  const handleRowClick = (record: any) => {};
  const handleRemoveCoupon = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    record: any
  ) => {
    e.stopPropagation();
    const filterMaterials = selectedMaterials.filter(
      (material: any) => material.IdMaterial !== record.IdMaterial
    );
    dispatch(
      actions.ImportGoodsActions.setMaterialSelectedImports(filterMaterials)
    );
  };

  return (
    <div className="info-coupon-page">
      <Col span={24}>
        <div className="list-bill-in-bill-page">
          <Table
            // rowSelection={rowSelection}
            columns={columns}
            dataSource={selectedMaterials}
            pagination={{
              pageSize: 5,
              showSizeChanger: false,
              hideOnSinglePage: true,
            }}
            onRow={(record: DataType) => ({
              onClick: () => handleRowClick(record),
            })}
          />
        </div>
      </Col>
    </div>
  );
};
export default ListMaterailImport;
