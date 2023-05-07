import React, { useEffect, useState } from "react";
import { Row, Col, Input, Button, Form, Modal, InputNumber } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import useAction from "../../../../../redux/useActions";
import { Navigate, useNavigate } from "react-router-dom";
import "./EnterCoupon.scss";
import { RouterLinks } from "../../../../../const";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import Table, { ColumnsType } from "antd/es/table";
import removeAccents from "../../../../../const/RemoveAccent";
import Spinn from "../../../../../components/Spinning/Spinning";
import useDebounce from "../../../../../hooks/useDebounce";
interface DataType {
  key: React.Key;
  IdMaterial: string;
  NameMaterial: string;
  Amount: Number;
}
interface DataType2 {
  key: string;
  NameMaterial: string;
  IdMaterial: string;
  Amount: string;
  Price: string;
  NameProvider: string;
  PhoneProvider: Number;
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
  const columns2: ColumnsType<DataType2> = [
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
      render: (text, record) => (
        <InputNumber
          className="input-number"
          required={true}
          value={text}
          onChange={(e) => handleAmountChange(e, record.key)}
          type="number"
          onKeyDown={(e) => {
            if (
              e.key === "-" ||
              e.key === "e" ||
              e.key === "+" ||
              e.key === "E"
            ) {
              e.preventDefault();
            }
          }}
        />
      ),
    },
    {
      title: "Giá nhập/SP(VND)",
      dataIndex: "Price",
      render: (text, record) => (
        <InputNumber
          addonAfter="VNĐ"
          className="input-number"
          required={true}
          value={text}
          onChange={(e) => handlePriceChange(e, record.key)}
          type="number"
          onKeyDown={(e) => {
            if (
              e.key === "-" ||
              e.key === "e" ||
              e.key === "+" ||
              e.key === "E"
            ) {
              e.preventDefault();
            }
          }}
        />
      ),
    },
    {
      title: "",
      dataIndex: "removeCoupon",
      render: (text: any, record: DataType2) => (
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
  const [formProvider] = Form.useForm();
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const actions = useAction();
  const navigate = useNavigate();
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [selectedmaterials, setSelectedMaterials] = useState<any>([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState<any>([]);
  const [valueSelectedMaterials, setValueSelectedMaterials] = useState<any>([]);
  const materials = useSelector((state: any) => state.material.materials);
  const loading = useSelector((state: any) => state.state.loadingState);
  const [searchValue, setSearchValue] = useState("");
  const searchValueDebounce = useDebounce<string>(searchValue, 500);
  const selectedPage = useSelector((state: any) => state.material.selectedPage);
  useEffect(() => {
    dispatch(actions.MaterialActions.setSearchValue(searchValueDebounce));
    dispatch(actions.MaterialActions.loadData());
  }, [dispatch, actions.MaterialActions, searchValueDebounce, selectedPage]);

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
      const filteredSelectedMaterials = data.filter((material) => {
        return !valueSelectedMaterials.some((selectedMaterial: any) => {
          return selectedMaterial.key === material.key;
        });
      });
      setValueSelectedMaterials((prevValue: any) => [
        ...prevValue,
        ...filteredSelectedMaterials,
      ]);
    }
  };
  //mở phần thêm nguyên liệu
  const handleOpenModalSelectMaterial = () => {
    setIsOpenModal(true);
  };

  const handleSearchMaterial = (e: any) => {
    dispatch(actions.MaterialActions.setSelectedPage(1));
    setSearchValue(e.target.value);
  };
  const handleCancleImport = () => {
    dispatch(actions.ImportGoodsActions.setMaterialSelectedImports([]));
    navigate(RouterLinks.IMPORT_WAREHOUSE);
    dispatch(actions.ImportGoodsActions.loadData());
  };
  const handleAddImportCoupon = () => {
    dispatch(
      actions.StateAction.redirect({
        navigate: navigate,
        path: RouterLinks.IMPORT_WAREHOUSE,
      })
    );
    dispatch(
      actions.ImportGoodsActions.setInfoProvider(formProvider.getFieldsValue())
    );
    dispatch(
      actions.ImportGoodsActions.setMaterialSelectedImports(
        valueSelectedMaterials
      )
    );
    dispatch(actions.ImportGoodsActions.createImportGoods());
  };

  //remove material selected
  const handleRemoveCoupon = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    record: any
  ) => {
    e.stopPropagation();
    const filterMaterials = valueSelectedMaterials.filter(
      (material: any) => material.IdMaterial !== record.IdMaterial
    );
    const filterRowKey = selectedRowKeys.filter(
      (row: any) => row !== record.key
    );
    setSelectedRowKeys(filterRowKey);
    setValueSelectedMaterials(filterMaterials);
  };

  ///amount change
  const handleAmountChange = (e: any, key: any) => {
    const newData = valueSelectedMaterials.map((item: any) => {
      if (item.key === key) {
        return {
          ...item,
          Amount: e,
        };
      }
      return item;
    });
    setValueSelectedMaterials(newData);
  };
  ///price change
  const handlePriceChange = (e: any, key: any) => {
    const newData = valueSelectedMaterials.map((item: any) => {
      if (item.key === key) {
        return {
          ...item,
          Price: e,
        };
      }
      return item;
    });
    setValueSelectedMaterials(newData);
  };

  return (
    <div className="enter-coupon-page">
      {loading ? <Spinn /> : ""}
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
                type: "checkbox",
                ...rowSelection,
                selectedRowKeys: selectedRowKeys,
              }}
              columns={columns}
              dataSource={
                Array.isArray(materials?.Data)
                  ? materials.Data.map((material: any) => {
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
                    }).sort((a: { key: any }, b: { key: any }) => {
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
                total: materials?.TotalPage ? materials?.TotalPage : 0,
                showSizeChanger: false,
                hideOnSinglePage: true,
                onChange: (page) => {
                  dispatch(actions.MaterialActions.setSelectedPage(page));
                },
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
                {/* <ListMaterailImport /> */}
                <div className="info-coupon-page">
                  <Col span={24}>
                    <div className="list-bill-in-bill-page">
                      <Table
                        // rowSelection={rowSelection}
                        columns={columns2}
                        //  dataSource={selectedMaterials}
                        dataSource={valueSelectedMaterials}
                        pagination={{
                          pageSize: 5,
                          showSizeChanger: false,
                          hideOnSinglePage: true,
                        }}
                      />
                    </div>
                  </Col>
                </div>
                {/*  */}
                <Col span={18}></Col>
                <Col span={2}>
                  <Button onClick={handleCancleImport} danger>
                    Hủy
                  </Button>
                </Col>
                <Col span={4}>
                  <Button
                    disabled={
                      !Array.isArray(valueSelectedMaterials) ||
                      valueSelectedMaterials?.length <= 0 ||
                      valueSelectedMaterials.some(
                        (material: any) =>
                          material?.Price === 0 ||
                          material?.Amount === 0 ||
                          material?.Price === "" ||
                          material?.Amount === ""
                      )
                    }
                    onClick={handleAddImportCoupon}
                    type="primary"
                  >
                    Thêm phiếu nhập
                  </Button>
                </Col>
              </Row>
              <Row></Row>
            </div>
          </div>
        </Col>
        <Col span={6}>
          {/* <InfoMaterialImport /> */}
          <div className="info-material-import">
            <div style={{ padding: "10px" }}>
              <Form form={formProvider} layout="vertical">
                <Row gutter={[0, 10]}>
                  <Col span={6}></Col>
                  <Col span={12}>
                    <div>
                      <span style={{ fontSize: "18px", fontWeight: "500" }}>
                        Nhà cung cấp
                      </span>
                    </div>
                  </Col>
                  <Col span={6}></Col>
                  <Col span={24}>
                    <Row gutter={[0, 0]}>
                      <Col span={24}>
                        <div
                          style={{
                            border: "0.5px solid black",
                            opacity: "0.05",
                          }}
                        ></div>
                        <span style={{ fontWeight: "500" }}>
                          Thông tin nhà cung cấp
                        </span>
                      </Col>
                      <Col span={24}>
                        <Form.Item label="Tên nhà cung cấp" name="NameProvider">
                          <Input name="NameProvider"></Input>
                        </Form.Item>
                      </Col>
                      <Col span={24}>
                        <Form.Item label="Số điện thoại" name="PhoneProvider">
                          <Input
                            type="number"
                            name="PhoneProvider"
                            style={{ width: "100%" }}
                            onKeyDown={(e) => {
                              if (
                                e.key === "-" ||
                                e.key === "e" ||
                                e.key === "+" ||
                                e.key === "E"
                              ) {
                                e.preventDefault();
                              }
                            }}
                          ></Input>
                        </Form.Item>
                      </Col>
                    </Row>
                  </Col>
                </Row>
              </Form>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default EnterCoupon;
