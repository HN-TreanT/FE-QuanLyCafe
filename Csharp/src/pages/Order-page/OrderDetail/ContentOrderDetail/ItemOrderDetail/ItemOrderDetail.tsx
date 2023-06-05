import React from "react";
import { Row, Col, Input } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { useDispatch } from "react-redux";
import { PlusCircleOutlined, MinusCircleOutlined } from "@ant-design/icons";
import useAction from "../../../../../redux/useActions";
import "./ItemOrderDetail.scss";
import { orderDetailServices } from "../../../../../untils/networks/services/OrderDetailService";
import { VND } from "../../../../../const/convertVND";
const ItemOrderDetail: React.FC<any> = ({ data }) => {
  const dispatch = useDispatch();
  const actions = useAction();
  const handleDeleteOrderDetail = async (data: any) => {
    try {
      dispatch(actions.StateAction.loadingState(true));
      const res = await orderDetailServices.deleteOrderDetail(data?.IdOrderDetail);
      if (res?.Status) {
        dispatch(actions.OrderPageActions.loadOrders());
        dispatch(actions.OrderPageActions.loadSelectedOrder());
        dispatch(actions.StateAction.loadingState(false));
      } else {
        dispatch(actions.StateAction.loadingState(false));
      }
    } catch (err: any) {
      console.log(err);
    }
  };
  const handleIncreaseAmount = async (data: any) => {
    try {
      const res = await orderDetailServices.updateOrderDetail(data?.IdOrderDetail, {
        Amount: data?.Amout ? data?.Amout + 1 : 1,
      });
      if (res?.Status) {
        dispatch(actions.OrderPageActions.loadSelectedOrder());
        dispatch(actions.OrderPageActions.loadOrders());
      }
    } catch (err: any) {
      console.log(err);
    }
  };
  const handleDecreaseAmount = async (data: any) => {
    try {
      if (data.Amout - 1 === 0) {
        handleDeleteOrderDetail(data);
      } else {
        const res = await orderDetailServices.updateOrderDetail(data?.IdOrderDetail, {
          Amount: data?.Amout ? data?.Amout - 1 : 1,
        });
        if (res?.Status) {
          dispatch(actions.OrderPageActions.loadSelectedOrder());
          dispatch(actions.OrderPageActions.loadOrders());
        }
      }
    } catch (err: any) {
      console.log(err);
    }
  };
  return (
    <div className="item-order-detail">
      <div className="content-item-order-detail">
        <Row gutter={[10, 10]}>
          <Col span={9}>
            <span className="name-product-order-detail">{`${data?.IdProductNavigation.Title}`}</span>
          </Col>
          <Col span={2}>
            <span
              style={{
                padding: "5px",
                borderRadius: "15px",
                background: "",
                color: "#1677ffbb",
                backgroundColor: "#1677ff42",
              }}
            >
              {`${data?.IdProductNavigation?.Unit}`}
            </span>
          </Col>
          <Col span={7}>
            <div>
              <MinusCircleOutlined
                onClick={() => handleDecreaseAmount(data)}
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
                {data?.Amout ? data?.Amout : 1}
              </span>
              <PlusCircleOutlined
                onClick={() => handleIncreaseAmount(data)}
                className="icon-control-amount"
              />
            </div>
          </Col>
          <Col span={4}>
            <span style={{ fontWeight: "500" }}>{`${
              data?.Price ? VND.format(data.Price) : 0
            }`}</span>
          </Col>
          <Col span={1}>
            <FontAwesomeIcon
              onClick={() => handleDeleteOrderDetail(data)}
              className="icon-delete-order-detail"
              icon={faTrashCan}
            />
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default ItemOrderDetail;
