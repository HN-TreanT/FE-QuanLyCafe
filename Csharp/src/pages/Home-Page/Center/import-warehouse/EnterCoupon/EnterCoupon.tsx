import React, { useEffect, useState } from "react";
import { Row, Col, Input, Button, Form, Modal } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import useAction from "../../../../../redux/useActions";
import { Navigate, useNavigate } from "react-router-dom";
import "./EnterCoupon.scss";
import { RouterLinks } from "../../../../../const";
import ListMaterailImport from "./ListMaterialImport/ListMaterialImport";
import InfoMaterialImport from "./InfoMaterialImport/InfoMaterialImport";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import Table, { ColumnsType } from "antd/es/table";
import removeAccents from "../../../../../const/RemoveAccent";
interface DataType {
  key: React.Key;
  IdMaterial: string;
  NameMaterial: string;
  Amount: Number;
}
const EnterCoupon: React.FC = () => {
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
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const actions = useAction();
  const navigate = useNavigate();
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [selectionType, setSelectionType] = useState<"checkbox" | "radio">(
    "checkbox"
  );
  const [selectedmaterials, setSelectedMaterials] = useState<any>([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState<any>([]);
  const materials = useSelector((state: any) => state.material.materials);
  const [valueMaterials, setValueMaterials] = useState(materials);
  useEffect(() => {
    dispatch(actions.MaterialActions.loadData());
  }, [dispatch, actions.MaterialActions]);

  //select material
  const rowSelection = {
    onChange: (selectedRowKeys: React.Key[], selectedRows: DataType[]) => {
      setSelectedMaterials(selectedRows);
      setSelectedRowKeys(selectedRowKeys);
    },
  };
  //back
  const hadleBack = () => {
    dispatch(actions.ImportGoodsActions.setMaterialSelectedImports([]));
    navigate(RouterLinks.IMPORT_WAREHOUSE);
    dispatch(actions.ImportGoodsActions.loadData());
  };
  //thêm nguyên liệu
  const handleAddMaterial = () => {
    setIsOpenModal(false);
    form.resetFields();
    if (Array.isArray(selectedmaterials)) {
      const data = selectedmaterials.map((material: any) => {
        return {
          key: material?.key,
          NameMaterial: material?.NameMaterial ? material?.NameMaterial : "",
          IdMaterial: material?.key ? material?.key : "",
          Amount: 0,
          Price: 0,
          NameProvider: "",
          PhoneProvider: "",
        };
      });
      dispatch(actions.ImportGoodsActions.setMaterialSelectedImports(data));
    }
  };
  //mở phần thêm nguyên liệu
  const handleOpenModalSelectMaterial = () => {
    setIsOpenModal(true);
  };

  const handleSearchMaterial = (e: any) => {
    let filterMaterial: any[] = [];
    filterMaterial = valueMaterials.filter((material: any) => {
      const newMaterial = removeAccents(
        material.NameMaterial
      ).toLocaleLowerCase();
      const searchMaterial = removeAccents(e.target.value).toLocaleLowerCase();
      return newMaterial.includes(searchMaterial);
    });
    if (e.target.value) {
      setValueMaterials(filterMaterial);
    } else {
      setValueMaterials(materials);
    }
  };
  const handleCancleImport = () => {
    dispatch(actions.ImportGoodsActions.setMaterialSelectedImports([]));
    navigate(RouterLinks.IMPORT_WAREHOUSE);
    dispatch(actions.ImportGoodsActions.loadData());
  };
  const handleAddImportCoupon = () => {};
  return (
    <div className="enter-coupon-page">
      <Modal
        open={isOpenModal}
        title="Tìm kiếm từ kho hàng hóa"
        onCancel={() => {
          setIsOpenModal(false);
          form.resetFields();
        }}
        onOk={handleAddMaterial}
      >
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
                type: selectionType,
                ...rowSelection,
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
                        const aIsSelected = selectedRowKeys.includes(a.key);
                        const bIsSelected = selectedRowKeys.includes(b.key);

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
      </Modal>
      <span onClick={hadleBack} style={{ cursor: "pointer", color: "#666" }}>
        <ArrowLeftOutlined style={{ padding: "3px" }} />
        <span>Quay lại danh sách mặt hàng</span>
      </span>
      <Row gutter={[20, 10]}>
        <Col span={24}>
          <div className="tittle-enter-coupon-page">Thêm mới mặt hàng</div>
        </Col>
        <Col span={18}>
          {/* <ListMaterailImport /> */}
          <div className="info-coupon-page">
            <div
              className="content-info-coupon-page"
              style={{ padding: "15px" }}
            >
              <Row gutter={[15, 15]}>
                <Col span={17}>
                  <div className="title-info-coupon-page">
                    Thông tin sản phẩm
                  </div>
                </Col>
                <Col span={7}>
                  <Button
                    onClick={handleOpenModalSelectMaterial}
                    type="primary"
                  >
                    <FontAwesomeIcon icon={faPlus} />
                    <span style={{ paddingLeft: "5px" }}>
                      Thêm hàng hóa vào danh sách
                    </span>
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
                <ListMaterailImport data={selectedmaterials} />
                <Col span={18}></Col>
                <Col span={2}>
                  <Button onClick={handleCancleImport} danger>
                    Hủy
                  </Button>
                </Col>
                <Col span={4}>
                  <Button onClick={handleAddImportCoupon} type="primary">
                    Thêm phiếu nhập
                  </Button>
                </Col>
              </Row>
              <Row></Row>
            </div>
          </div>
        </Col>
        <Col span={6}>
          <InfoMaterialImport />
        </Col>
      </Row>
    </div>
  );
};

export default EnterCoupon;
