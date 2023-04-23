import React from "react";
import { Row, Col, Button, Table } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import useAction from "../../../../redux/useActions";
import { useNavigate } from "react-router-dom";
import Spinn from "../../../../components/Spinning/Spinning";
import "./CustomerPage.scss";
import { ColumnsType } from "antd/es/table";
interface DataType {
  key: string;
  Fullname: string;
  PhoneNumber: string;
  countOrders: Number;
  TotalPay: Number;
}
const CustomerPage: React.FC = () => {
  const columns: ColumnsType<DataType> = [
    {
      title: "Khách hàng",
      dataIndex: "Fullname",
      render: (text) => <div style={{ color: "#1677ff" }}>{text}</div>,
    },
    {
      title: "Số điện thoại",
      dataIndex: "PhoneNumber",
    },
    {
      title: "Số hóa đơn",
      dataIndex: "countOrders",
    },
    {
      title: "Tổng chi tiêu",
      dataIndex: "TotalPay",
    },
  ];
  const actions = useAction();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const loading = useSelector((state: any) => state.state.loadingState);
  const handleClickButtonAddProduct = () => {};
  return (
    <div className="customer-page">
      {loading ? <Spinn /> : " "}
      <Row gutter={[0, 15]}>
        <Col span={24}>
          <div className="title-button-customer-page">
            <div className="title-customer-page">Danh sách mặt hàng</div>
            <Button
              onClick={handleClickButtonAddProduct}
              type="primary"
              className="button-add-customer"
            >
              <FontAwesomeIcon icon={faPlus} />
              <span> Thêm mặt hàng</span>
            </Button>
          </div>
        </Col>
        <Col span={24}>
          <Table
            style={{ marginLeft: "20px" }}
            columns={columns}
            // dataSource={valueProducts}
            pagination={{
              pageSize: 5,
              total: 33,
              onChange: (page) => {
                console.log(page);
              },
            }}
            // onRow={(record: DataType) => ({
            //   onClick: () => handleRowClick(record),
            // })}
          />
        </Col>
      </Row>
    </div>
  );
};
export default CustomerPage;
