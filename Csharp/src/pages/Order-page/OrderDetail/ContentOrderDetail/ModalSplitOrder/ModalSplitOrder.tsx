import React from "react";
import { Button, Col, Modal, Row, Radio, Input, InputNumber } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquareCheck, faBan } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import useAction from "../../../../../redux/useActions";
import SearchTable from "./SearchTable/SearchTable";
import "./ModalSplitOrder.scss";
import Table, { ColumnsType } from "antd/es/table";
import { valueType } from "antd/es/statistic/utils";
interface DataTypeGraftOrder {
  IdOrder: string;
  CountProdut: Number;
  Price: Number;
}
interface DataTypeSplitOrder {
  NameProduct: string;
  Count: Number;
  CountSplit: any;
}
let dataGraftSplit: any[] = [];
for (var j = 0; j < 10; j++) {
  dataGraftSplit.push({
    key: j,
    NameProduct: `sản phẩm ${j}`,
    Count: j,
    CountSplit: j - 1,
  });
}
let dataGraftOrder: any[] = [];
for (var i = 0; i < 10; i++) {
  dataGraftOrder.push({
    key: i,
    IdOrder: `nfefnf-${i}`,
    CountProduct: i,
    Price: "nfehef",
  });
}
const ModalSplitOrder: React.FC<any> = ({ visible, setIsOpenModal }) => {
  const columnsGraftOrder: ColumnsType<DataTypeGraftOrder> = [
    {
      title: "Mã tham chiếu",
      dataIndex: "IdOrder",
    },
    {
      title: "Số lượng mặt hàng",
      dataIndex: "CountProduct",
    },
    {
      title: "Tổng tiền",
      dataIndex: "Price",
    },
  ];
  const columnsSplitOrder: ColumnsType<DataTypeSplitOrder> = [
    {
      title: "Tên món ăn",
      dataIndex: "NameProduct",
    },
    {
      title: "Số lượng trên hóa đơn gốc",
      dataIndex: "Count",
    },
    {
      title: "Số lượng tách",
      dataIndex: "CountSplit",
      render: (text: any, record: DataTypeSplitOrder) => (
        <InputNumber
          defaultValue={0}
          max={record?.Count as valueType | undefined}
          min={0}
          type="number"
        ></InputNumber>
      ),
    },
  ];
  const actions = useAction();
  const dispatch = useDispatch();
  // const [valueRaido, setValueRadio] = React.useState();
  const radioSplitGraftOrder = useSelector(
    (state: any) => state.orderpage.radioSplitGraftOrder
  );

  const onChangeRadio = (e: any) => {
    dispatch(
      actions.OrderPageActions.setRadioSelectSplitGraftOrder(e.target.value)
    );
    // setValueRadio(e.target.value);
  };

  return (
    <Modal
      title="Tách ghép hóa đơn"
      width={700}
      onCancel={() => setIsOpenModal(false)}
      footer={[
        <Button key="submit" type="primary">
          <FontAwesomeIcon
            style={{ paddingRight: "5px" }}
            icon={faSquareCheck}
          />
          <span> Thực hiện</span>
        </Button>,
        <Button
          key="cancle"
          onClick={() => {
            setIsOpenModal(false);
            // formAddCustomer.resetFields();
          }}
        >
          <FontAwesomeIcon style={{ paddingRight: "5px" }} icon={faBan} />
          <span> Bỏ qua</span>
        </Button>,
      ]}
      open={visible}
    >
      <div className="modal-split-order">
        <Row gutter={[15, 15]}>
          <Col span={24}>
            <Radio.Group
              onChange={onChangeRadio}
              value={radioSplitGraftOrder ? radioSplitGraftOrder : "graft"}
            >
              <Radio value={"graft"}>Ghép đơn</Radio>
              <Radio value={"split"}>Tách đơn</Radio>
            </Radio.Group>
          </Col>
          <Col span={24}>
            <span style={{ paddingRight: "10px", fontWeight: "500" }}>
              {radioSplitGraftOrder === "split" ? "Tách đến" : "Ghép đến"}
            </span>

            <SearchTable />
          </Col>
          <Col span={24}>
            <div style={{ marginLeft: "-20px" }}>
              {radioSplitGraftOrder === "split" ? (
                <Table
                  //loading={loading}
                  style={{ marginLeft: "20px" }}
                  columns={columnsSplitOrder}
                  dataSource={dataGraftSplit}
                  pagination={{
                    pageSize: 3,
                    showSizeChanger: false,
                    hideOnSinglePage: true,
                  }}
                />
              ) : (
                <Table
                  //loading={loading}
                  style={{ marginLeft: "20px" }}
                  columns={columnsGraftOrder}
                  dataSource={dataGraftOrder}
                  pagination={{
                    pageSize: 3,
                    showSizeChanger: false,
                    hideOnSinglePage: true,
                  }}
                />
              )}
            </div>
          </Col>
        </Row>
      </div>
    </Modal>
  );
};
export default ModalSplitOrder;
