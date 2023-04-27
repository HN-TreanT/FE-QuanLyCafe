import { Col, Form, Input, Table } from "antd";
import { ColumnsType } from "antd/es/table";
import { useDispatch, useSelector } from "react-redux";
import useAction from "../../../../../redux/useActions";
import React, { useEffect, useState } from "react";
import removeAccents from "../../../../../const/RemoveAccent";
import { notification } from "../../../../../components/notification";
import { materialService } from "../../../../../untils/networks/services/materialService";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import ModalEditMaterial from "../../../../../components/ModalEditMaterial/ModalEditMaterial";

interface DataType {
  key: string;
  IdMaterial: string;
  Description: string;
  NameMaterial: string;
  amount: Number;
  unit: string;
  expiry: Number;
}
const ContentListWareHouse: React.FC<any> = ({ data }) => {
  const [form] = Form.useForm();
  const columns: ColumnsType<DataType> = [
    {
      title: "Mã tham chiếu",
      dataIndex: "IdMaterial",
      render: (text) => <div style={{ color: "#1677ff" }}>{text}</div>,
    },
    {
      title: "Tên nguyên liệu",
      dataIndex: "NameMaterial",
    },
    {
      title: "Tồn kho",
      dataIndex: "amount",
      render: (text) => (
        <div style={text < 10 ? { color: "red" } : {}}>{text}</div>
      ),
    },
    {
      title: "Đơn vị",
      dataIndex: "unit",
    },
    {
      title: "Trạng thái",
      dataIndex: "expiry",
    },

    {
      title: "",
      dataIndex: "buttonDelete",
      render: (text: any, record: DataType) => (
        <div
          onClick={(e) => handleDeleteMaterial(e, record)}
          className="table-delete"
          style={{ cursor: "pointer" }}
        >
          X
        </div>
      ),
    },
  ];
  const dispatch = useDispatch();
  const actions = useAction();
  const loading = useSelector((state: any) => state.state.loadingState);
  const [valueMaterial, setValueMaterial] = useState(data);
  const [isOpenModalEdit, setIsOpenModalEdit] = useState(false);
  // const [isDisabled, setIsDisabled] = useState(true);
  const [materialsDetail, setMaterialDetail] = useState<any>();
  useEffect(() => {
    setValueMaterial(data);
  }, [data]);
  const handleDeleteMaterial = async (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    record: any
  ) => {
    e.stopPropagation();
    try {
      dispatch(actions.StateAction.loadingState(true));
      const reponse = await materialService.deleteMaterial(record.key);
      if (reponse.Status) {
        dispatch(actions.MaterialActions.loadData());
        dispatch(actions.StateAction.loadingState(false));
        notification({
          message: "xóa thành công",
          title: "Thông báo",
          position: "top-right",
          type: "success",
        });
      } else {
        notification({
          message: "xóa không thành công",
          title: "Thông báo",
          position: "top-right",
          type: "danger",
        });
        dispatch(actions.StateAction.loadingState(false));
      }
    } catch (err: any) {
      notification({
        message: "server không trả lời",
        title: "Thông báo",
        position: "top-right",
        type: "danger",
      });
      dispatch(actions.StateAction.loadingState(false));
    }
  };
  // handle click row materials
  const handleRowClick = (record: any) => {
    setMaterialDetail(record);
    setIsOpenModalEdit(true);
  };
  //hadle search
  const handleSearchValueChange = (e: any) => {
    let filterMaterial: any[] = [];
    filterMaterial = valueMaterial.filter((material: any) => {
      const newMaterial = removeAccents(
        material.NameMaterial
      ).toLocaleLowerCase();
      const searchMaterial = removeAccents(e.target.value).toLocaleLowerCase();
      return newMaterial.includes(searchMaterial);
    });
    if (e.target.value) {
      setValueMaterial(filterMaterial);
    } else {
      setValueMaterial(data);
    }
  };

  return (
    <>
      <ModalEditMaterial isOpen={isOpenModalEdit} data={materialsDetail} />
      <Col span={24}>
        <Form
          form={form}
          layout="horizontal"
          //  onValuesChange={handleValueFormChange}
          className="form-css"
        >
          <Form.Item name="searchValue" className="input-search-listWarehouse">
            <Input
              onChange={handleSearchValueChange}
              placeholder="Nhập giá trị muốn tìm kiếm theo loại"
              prefix={
                <FontAwesomeIcon
                  icon={faMagnifyingGlass}
                  className="icon-search"
                />
              }
            />
          </Form.Item>
        </Form>
      </Col>

      <Col span={24}>
        <div className="content-listWarehouse-page">
          <Table
            loading={loading}
            style={{ marginLeft: "20px" }}
            columns={columns}
            dataSource={valueMaterial}
            pagination={{
              pageSize: 6,
            }}
            onRow={(record: DataType) => ({
              onClick: () => handleRowClick(record),
            })}
          />
        </div>
      </Col>
    </>
  );
};
export default ContentListWareHouse;
