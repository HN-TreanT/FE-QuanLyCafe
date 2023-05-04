import React, { useEffect, useState } from "react";
import {
  Row,
  Col,
  Form,
  Button,
  Input,
  Table,
  MenuProps,
  Menu,
  DatePicker,
} from "antd";
import { ColumnsType } from "antd/es/table";
import { useDispatch, useSelector } from "react-redux";
import useAction from "../../../../redux/useActions";
import "./ImportWarehouse.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass, faPlus } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { RouterLinks } from "../../../../const";
import { notification } from "../../../../components/notification";
import { importGoodService } from "../../../../untils/networks/services/importGoodsService";
import dayjs from "dayjs";
interface DataType {
  key: string;
  CreatedAt: Date;
  Id: string;
  NameMaterial: string;
  PhoneProvider: string;
  Amount: Number;
  Price: Number;
  NameProvider: string;
}

const items: MenuProps["items"] = [
  {
    label: "Tất cả phiếu nhập",
    key: "enterCoupon",
  },
];

const ImportWarehouse: React.FC = () => {
  let data: any[] = [];
  const columns: ColumnsType<DataType> = [
    {
      title: "Ngày tạo",
      dataIndex: "CreatedAt",
    },
    {
      title: "Nguyên liệu",
      dataIndex: "NameMaterial",
    },
    {
      title: "Mã tham chiếu",
      dataIndex: "Id",
      render: (text) => <div style={{ color: "#1677ff" }}>{text}</div>,
    },

    {
      title: "Số lượng",
      dataIndex: "Amount",
    },
    {
      title: "Giá trị nhập",
      dataIndex: "Price",
    },
    {
      title: "Nhà cung cấp",
      dataIndex: "NameProvider",
    },
    {
      title: "Số điện thoại",
      dataIndex: "PhoneProvider",
    },
    {
      title: "",
      dataIndex: "deleteImportGoods",
      render: (text: any, record: DataType) => (
        <div
          onClick={(e) => handleDelete(e, record)}
          className="table-delete"
          style={{ cursor: "pointer" }}
        >
          X
        </div>
      ),
    },
  ];
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const actions = useAction();
  const loading = useSelector((state: any) => state.state.loadingState);
  const selectedPage = useSelector((state: any) => state.importgoods.page);
  const searchValue = useSelector(
    (state: any) => state.importgoods.searchValue
  );
  const importGoods = useSelector(
    (state: any) => state.importgoods.importGoods
  );
  if (Array.isArray(importGoods?.Data)) {
    data = importGoods?.Data.map((ig: any) => {
      const date = new Date(ig?.CreatedAt);
      const formattedDate = date.toLocaleDateString("vi-VN");
      return {
        key: ig.IdDetailImportGoods ? ig.IdDetailImportGoods : "",
        Id: ig.IdDetailImportGoods ? ig.IdDetailImportGoods : "",
        CreatedAt: formattedDate,
        NameMaterial: ig.IdMaterialNavigation.NameMaterial
          ? ig.IdMaterialNavigation.NameMaterial
          : "",
        NameProvider: ig.NameProvider ? ig.NameProvider : "",
        PhoneProvider: ig.PhoneProvider ? ig.PhoneProvider : "",
        Amount: ig.Amount ? ig.Amount : "",
        Price: ig.Price ? ig.Price : "",
      };
    });
  }
  useEffect(() => {
    dispatch(actions.ImportGoodsActions.loadData());
  }, [dispatch, actions.ImportGoodsActions, selectedPage]);

  const handleRowClick = (record: any) => {};
  const handleClickButtonAddCoupon = () => {
    dispatch(actions.MaterialActions.loadData());
    navigate(RouterLinks.ENTER_COUPON_PAGE);
  };
  // delete
  const handleDelete = async (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    record: any
  ) => {
    console.log(record.key);
    try {
      dispatch(actions.StateAction.loadingState(true));
      let resposne = await importGoodService.deleteImportGood(record.key);
      if (resposne.Status) {
        dispatch(actions.ImportGoodsActions.loadData());
        dispatch(actions.StateAction.loadingState(false));
        notification({
          message: "Delete Success",
          title: "Thông báo",
          position: "top-right",
          type: "success",
        });
      } else {
        notification({
          message: resposne?.Message,
          title: "Thông báo",
          position: "top-right",
          type: "danger",
        });
        dispatch(actions.StateAction.loadingState(false));
      }
    } catch (err: any) {
      notification({
        message: "Delete failed",
        title: "Thông báo",
        position: "top-right",
        type: "danger",
      });
      dispatch(actions.StateAction.loadingState(false));
    }
  };
  //change input id
  const handleInputIdChange = (e: any) => {
    if (e.target.value === "") {
      dispatch(actions.ImportGoodsActions.loadData());
    }
    dispatch(
      actions.ImportGoodsActions.setSearchValue({
        ...searchValue,
        valueId: e.target.value,
      })
    );
  };
  //change input name
  const handleInputNameChange = (e: any) => {
    console.log(e.target.value);
  };
  //change input time
  const handleInputTime = (e: any) => {
    if (e) {
      dispatch(
        actions.ImportGoodsActions.setSearchValue({
          ...searchValue,
          timeStart: e[0].toString(),
          timeEnd: e[1].toString(),
        })
      );
      dispatch(actions.ImportGoodsActions.loadData());
    } else {
      dispatch(
        actions.ImportGoodsActions.setSearchValue({
          ...searchValue,
          timeStart: "",
          timeEnd: "",
        })
      );
      dispatch(actions.ImportGoodsActions.loadData());
    }
  };

  const handleClickSearchId = async () => {
    dispatch(actions.ImportGoodsActions.getImportGoodsById());
  };
  return (
    <div className="import-warehouse-page">
      <Row gutter={[0, 15]}>
        <Col span={24}>
          <div className="title-button-import-warehouse-page">
            <div className="title-import-warehouse-page">
              Danh sách phiếu nhập
            </div>
            <Button
              onClick={handleClickButtonAddCoupon}
              type="primary"
              className="button-add-import-warehouse"
            >
              <FontAwesomeIcon icon={faPlus} />
              <span> Nhập mặt hàng</span>
            </Button>
          </div>
        </Col>
        <Col span={24}>
          <div className="container-import-warehouse-page">
            <div className="header-import-warehouse-page">
              <Row gutter={[0, 10]}>
                <Col span={24}>
                  <Menu
                    selectedKeys={["enterCoupon"]}
                    mode="horizontal"
                    items={items}
                  />
                </Col>
                <Col span={24}>
                  <Form form={form} className="form-css">
                    <Row gutter={[30, 20]}>
                      <Col span={6}>
                        <Form.Item
                          name="Id"
                          className="input-search-import-warehouse input-label-inline-border"
                        >
                          <label className="ant-form-item-label" htmlFor="">
                            Mã tham chiếu
                          </label>
                          <Input
                            bordered={false}
                            placeholder="Nhập mã tham chiếu"
                            onChange={handleInputIdChange}
                            prefix={
                              <FontAwesomeIcon
                                onClick={handleClickSearchId}
                                icon={faMagnifyingGlass}
                                className="icon-search"
                              />
                            }
                          />
                        </Form.Item>
                      </Col>
                      <Col span={6}>
                        <Form.Item
                          name="nameMaterial"
                          className="input-search-import-warehouse input-label-inline-border"
                        >
                          <label className="ant-form-item-label" htmlFor="">
                            Tên nguyên liệu
                          </label>
                          <Input
                            onChange={handleInputNameChange}
                            bordered={false}
                            placeholder="Nhập tên nguyên liệu"
                            prefix={
                              <FontAwesomeIcon
                                icon={faMagnifyingGlass}
                                className="icon-search"
                              />
                            }
                          />
                        </Form.Item>
                      </Col>
                      <Col span={6}>
                        <Form.Item
                          name="time"
                          className="input-search-import-warehouse input-label-inline-border"
                        >
                          <label className="ant-form-item-label" htmlFor="">
                            Thời gian
                          </label>
                          <DatePicker.RangePicker
                            defaultValue={
                              searchValue?.timeStart && searchValue?.timeEnd
                                ? [
                                    dayjs(searchValue.timeStart),
                                    dayjs(searchValue.timeEnd),
                                  ]
                                : null
                            }
                            onChange={handleInputTime}
                            className="date-picker-form"
                          />
                        </Form.Item>
                      </Col>
                    </Row>
                  </Form>
                </Col>
              </Row>
            </div>
            <div className="content-import-warehouse-page">
              <Table
                loading={loading}
                style={{ marginLeft: "20px" }}
                columns={columns}
                dataSource={data}
                pagination={{
                  defaultCurrent: selectedPage,
                  pageSize: 5,
                  total: importGoods.TotalPage ? importGoods.TotalPage : 5,
                  onChange: (page) => {
                    dispatch(actions.ImportGoodsActions.setPage(page));
                  },
                }}
                onRow={(record: DataType) => ({
                  onClick: () => handleRowClick(record),
                })}
              />
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
};
export default ImportWarehouse;
