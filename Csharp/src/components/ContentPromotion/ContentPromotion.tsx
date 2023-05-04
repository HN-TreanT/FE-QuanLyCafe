import {
  Col,
  Row,
  Table,
  Form,
  Menu,
  Select,
  Input,
  MenuProps,
  Button,
  Image,
} from "antd";
import React, { useEffect, useState } from "react";
import { ProductSupport } from "../../const/ProductSupport";
import { useDispatch, useSelector } from "react-redux";
import useAction from "../../redux/useActions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faTrash } from "@fortawesome/free-solid-svg-icons";
import { ColumnsType } from "antd/es/table";
import { useNavigate } from "react-router-dom";
import { RouterLinks } from "../../const";
import { productServices } from "../../untils/networks/services/productService";
import { notification } from "../notification";
const items: MenuProps["items"] = [
  {
    label: "Tất cả khuyến mãi",
    key: "allPromotion",
  },
  {
    label: "Khuyến mãi còn hạn",
    key: "PromotionExp",
  },
];
interface DataType {
  key: string;
  Name: string;
  TimeStart: Date;
  TimeEnd: Date;
}
const ContentPromotion: React.FC<any> = ({ value }) => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [valuePromotion, setValuePromotion] = useState(value);
  const statePromotion = useSelector(
    (state: any) => state.promotion.statePromotion
  );
  const columns: ColumnsType<DataType> = [
    {
      title: "Tên khuyến mãi",
      dataIndex: "Name",
    },

    {
      title: "Ngày bắt đầu",
      dataIndex: "TimeStart",
    },
    {
      title: "Ngày kết thúc",
      dataIndex: "TimeEnd",
    },
    {
      title: "",
      dataIndex: "buttonDelete",
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
  useEffect(() => {
    setValuePromotion(value);
  }, [value]);
  const dispatch = useDispatch();
  const loading = useSelector((state: any) => state.state.loadingState);
  const actions = useAction();
  const handleDelete = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    record: any
  ) => {
    e.stopPropagation();
  };
  const handleValueFormChange = () => {};
  const handleRowClick = (record: any) => {};
  const handleChangeSelectMenu = (e: any) => {
    dispatch(actions.PromotionAction.setStatePromotion(e.key));
  };
  return (
    <>
      <Col span={24}>
        <div className="container-promotion-page">
          <div className="header-promotion-page">
            <Row>
              <Col span={24}>
                <Menu
                  onClick={handleChangeSelectMenu}
                  selectedKeys={
                    statePromotion ? statePromotion : "allPromotion"
                  }
                  mode="horizontal"
                  items={items}
                />
              </Col>
              <Col span={24}>
                <div
                  style={{
                    // height: "0.5px",
                    border: "0.5px solid black",
                    opacity: "0.05",
                  }}
                ></div>
              </Col>
              <Col span={24}>
                <Form
                  form={form}
                  layout="horizontal"
                  onValuesChange={handleValueFormChange}
                  className="form-css"
                >
                  <Form.Item
                    name="searchValue"
                    className="input-search-promotion"
                  >
                    <Input.Search
                      //onChange={handleSearchValueChange}
                      placeholder="Nhập giá trị muốn tìm kiếm theo loại"
                    />
                  </Form.Item>
                </Form>
              </Col>
            </Row>
          </div>
          <div className="content-promotion-page">
            <Table
              loading={loading}
              style={{ marginLeft: "20px" }}
              columns={columns}
              dataSource={valuePromotion}
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
        </div>
      </Col>
    </>
  );
};
export default ContentPromotion;
