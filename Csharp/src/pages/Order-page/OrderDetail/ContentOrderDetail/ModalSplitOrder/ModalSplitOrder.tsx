import React, { useEffect, useState } from "react";
import { Button, Col, Modal, Row, Radio, Select } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquareCheck, faBan } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import useAction from "../../../../../redux/useActions";
import SearchTable from "./SearchTable/SearchTable";
import "./ModalSplitOrder.scss";
import Table, { ColumnsType } from "antd/es/table";
import { PlusCircleOutlined, MinusCircleOutlined } from "@ant-design/icons";
import { billServices } from "../../../../../untils/networks/services/billService";
import { notification } from "../../../../../components/notification";
interface DataTypeGraftOrder {
  IdOrder: string;
  CountProdut: Number;
  Price: Number;
}
interface DataTypeSplitOrder {
  NameProduct: string;
  Count: Number;
  IdProduct: string;
  CountSplit: any;
}

let dataGraftOrder: any[] = [];
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
        <div>
          <MinusCircleOutlined
            onClick={() => handleDecreaseAmount(record)}
            className="icon-control-amount"
          />
          <span
            style={{
              paddingLeft: "5px",
              paddingRight: "5px",
              fontWeight: "500",
              color: "rgba(0, 0, 0, 0.700)",
            }}
          >
            {text}
          </span>
          <PlusCircleOutlined
            onClick={() => handleIncreaseAmount(record)}
            className="icon-control-amount"
          />
        </div>
      ),
    },
  ];

  const actions = useAction();
  const dispatch = useDispatch();
  // const [valueRaido, setValueRadio] = React.useState();
  const selectedOrder = useSelector(
    (state: any) => state.orderpage.selectedOrder
  );
  const orderSplit = useSelector((state: any) => state.orderpage.orderSplit);

  const [disabled, setDisabled] = useState(true);

  //new selectedTable graft or split
  const selectedTable = useSelector(
    (state: any) => state.orderpage.selectedTableOnSplitOrder
  );
  const [dataSplitOrder, setDataSplitOrder] = useState<any>([]);
  useEffect(() => {
    if (Array.isArray(selectedOrder?.OrderDetails)) {
      setDataSplitOrder(
        selectedOrder?.OrderDetails.map((item: any) => {
          return {
            key: item?.IdOrderDetail,
            NameProduct: `sản phẩm ${item?.IdProductNavigation.Title}`,
            IdProduct: item?.IdProductNavigation.IdProduct,
            Count: item?.Amout ? item?.Amout : 0,
            CountSplit: 0,
          };
        })
      );
    }
  }, [selectedOrder?.OrderDetails]);
  if (selectedOrder) {
    dataGraftOrder = [
      {
        key: selectedOrder?.IdOrder,
        IdOrder: selectedOrder?.IdOrder,
        CountProduct: selectedOrder?.OrderDetails?.length,
        Price: selectedOrder?.Price ? selectedOrder?.Price : 0,
      },
    ];
  }

  const radioSplitGraftOrder = useSelector(
    (state: any) => state.orderpage.radioSplitGraftOrder
  );
  useEffect(() => {
    dispatch(actions.OrderPageActions.setRadioSelectSplitGraftOrder("graft"));
  }, [actions.OrderPageActions, dispatch]);
  const onChangeRadio = (e: any) => {
    dispatch(
      actions.OrderPageActions.setRadioSelectSplitGraftOrder(e.target.value)
    );
    // setValueRadio(e.target.value);
  };
  const handleGraftOrder = async () => {
    if (radioSplitGraftOrder === "split") {
      dispatch(
        actions.OrderPageActions.setOrderSplit({
          ...orderSplit,
          dataSplitOrder: dataSplitOrder,
        })
      );
      dispatch(actions.OrderPageActions.handleSplitOrder());
      dispatch(actions.OrderPageActions.setSelectedTableOnSplitOrder({}));
      setIsOpenModal(false);
    }
    if (radioSplitGraftOrder === "graft" || !radioSplitGraftOrder) {
      try {
        let response = await billServices.graftOrder(
          selectedOrder?.IdOrder,
          selectedTable?.value
        );
        if (response?.Status) {
          dispatch(actions.OrderPageActions.setSelectedTableOnSplitOrder({}));
          dispatch(
            actions.OrderPageActions.setSelectedOrder({
              IdOrder: selectedTable?.value,
            })
          );
          dispatch(actions.OrderPageActions.loadTable());
          dispatch(actions.OrderPageActions.loadOrders());
          dispatch(actions.OrderPageActions.loadSelectedOrder());
          notification({
            message: "Gộp hóa đơn thành công",
            title: "Thông báo",
            position: "top-right",
            type: "success",
          });
          setIsOpenModal(false);
        } else {
          notification({
            message: response.Message,
            title: "Thông báo",
            position: "top-right",
            type: "danger",
          });
        }
      } catch (err: any) {
        console.log(err);
      }
    }
  };
  const handleDecreaseAmount = (record: any) => {
    if (Array.isArray(dataSplitOrder)) {
      const updatedDataSplitOrder = dataSplitOrder.map((item: any) => {
        if (item.key === record.key) {
          const newCountSplit =
            item.CountSplit - 1 >= 0 ? item.CountSplit - 1 : 0;
          const newCount =
            item.CountSplit - 1 < 0 ? item.Count : item.Count + 1;
          return {
            ...item,
            CountSplit: newCountSplit,
            Count: newCount,
          };
        }
        return item;
      });
      setDataSplitOrder(updatedDataSplitOrder);
    }
  };
  const handleIncreaseAmount = (record: any) => {
    if (Array.isArray(dataSplitOrder)) {
      const updatedDataSplitOrder = dataSplitOrder.map((item: any) => {
        if (item.key === record.key && item.Count > 0) {
          const newCountSplit = item.CountSplit + 1;
          const newCount = item.Count - 1;
          return {
            ...item,
            CountSplit: newCountSplit,
            Count: newCount,
          };
        }
        return item;
      });
      setDataSplitOrder(updatedDataSplitOrder);
    }
  };
  return (
    <Modal
      title="Tách ghép hóa đơn"
      width={700}
      onCancel={() => {
        setIsOpenModal(false);
        dispatch(actions.OrderPageActions.setSelectedTableOnSplitOrder({}));
        dispatch(actions.OrderPageActions.setOrderSplit({}));
      }}
      footer={[
        <Button
          //   disabled={radioSplitGraftOrder === "split" && disabled}
          onClick={handleGraftOrder}
          key="submit"
          type="primary"
        >
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
            dispatch(actions.OrderPageActions.setSelectedTableOnSplitOrder({}));
            // formAddCustomer.resetFields();
            setDataSplitOrder(
              Array.isArray(selectedOrder?.OrderDetails)
                ? selectedOrder?.OrderDetails.map((item: any) => {
                    return {
                      key: item?.IdOrderDetail,
                      NameProduct: `sản phẩm ${item?.IdProductNavigation.Title}`,
                      IdProduct: item?.IdProductNavigation.IdProduct,
                      Count: item?.Amout ? item?.Amout : 0,
                      CountSplit: 0,
                    };
                  })
                : []
            );
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
            {radioSplitGraftOrder === "split" ? (
              <Select
                value={
                  orderSplit?.typeSplitOrder
                    ? orderSplit?.typeSplitOrder
                    : "createNewOrder"
                }
                style={{ marginRight: "10px", width: "200px" }}
                onChange={(e: any) => {
                  dispatch(
                    actions.OrderPageActions.setOrderSplit({
                      typeSplitOrder: e,
                    })
                  );
                }}
                options={[
                  {
                    value: "createNewOrder",
                    label: "Tạo hóa đơn mới",
                  },
                  {
                    value: "splitOtherOrder",
                    label: "Tách đến hóa đơn khác",
                  },
                ]}
              />
            ) : (
              ""
            )}
            <SearchTable />
          </Col>
          <Col span={24}>
            <div style={{ marginLeft: "-20px" }}>
              {radioSplitGraftOrder === "split" ? (
                <Table
                  style={{ marginLeft: "20px" }}
                  columns={columnsSplitOrder}
                  dataSource={dataSplitOrder}
                  pagination={{
                    pageSize: 3,
                    showSizeChanger: false,
                    hideOnSinglePage: true,
                  }}
                />
              ) : (
                <Table
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
