import React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBellConcierge,
  faClock,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { DollarCircleFilled } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import useAction from "../../../redux/useActions";
import "./ItemOrder.scss";
import { Col, Row } from "antd";
import { billServices } from "../../../untils/networks/services/billService";
const ItemOrder: React.FC<any> = ({ style, data }) => {
  const actions = useAction();
  const dispatch = useDispatch();
  const handleClickItemOrder = async (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    const allCards = document.querySelectorAll(".card-item-order");
    allCards.forEach((card) => {
      if (card !== event.currentTarget) {
        card.classList.remove("click-item-order");
      }
    });
    event.currentTarget.classList.add("click-item-order");
    try {
      dispatch(actions.StateAction.loadingState(true));
      const order = await billServices.getDetailOrder(data?.IdOrder);
      if (order?.Status) {
        dispatch(actions.StateAction.loadingState(true));
        const order = await billServices.getDetailOrder(data?.IdOrder);
        dispatch(actions.OrderPageActions.setSelectedOrder(order?.Data));
        dispatch(actions.StateAction.loadingState(false));
      } else {
        dispatch(actions.StateAction.loadingState(false));
      }
    } catch (err: any) {
      console.log(err);
    }
    // console.log(data?.IdOrder);
  };
  const createdAt = new Date(data.CreatedAt);
  const now = new Date();
  let time = now.getTime() - createdAt.getTime();
  let timeOrders;

  if (time < 60000) {
    timeOrders = 0;
  }
  if (time >= 60000 && time < 3600000) {
    time = time / 60000;
    timeOrders = `${Math.floor(time)} phút`;
  }
  if (time >= 3600000 && time < 86400000) {
    time = time / 3600000;
    timeOrders = `${Math.floor(time)} giờ`;
  }
  if (time >= 86400000) {
    time = time / 86400000;
    timeOrders = `${Math.floor(time)} ngày`;
  }
  return (
    <div onClick={handleClickItemOrder} className={`card-item-order ${style}`}>
      <div className="title-item-order">
        <div style={{ marginLeft: "15px" }}>
          <FontAwesomeIcon
            style={{
              padding: "5px",
              backgroundColor: "#0066CC",
              color: "white",
            }}
            icon={faBellConcierge}
          />
          <span style={{ paddingLeft: "50px", fontWeight: "600" }}>
            MTA Coffee
          </span>
        </div>
      </div>
      <div className="content-item-order">
        <div className="table-card-item-order">{data?.NameTable}</div>
        <div className="side-bar-item-order">
          <div className="time-countcustomer">
            <Row gutter={[10, 10]}>
              <Col span={16}>
                <span style={{ paddingRight: "15px" }}>
                  <FontAwesomeIcon
                    className="icon-time-customer"
                    icon={faClock}
                  />
                  {timeOrders}
                </span>
              </Col>
              <Col span={8}>
                <span>
                  <FontAwesomeIcon
                    className="icon-time-customer"
                    icon={faUser}
                  />
                  {data?.Amount ? data?.Amount : ""}
                </span>
              </Col>
            </Row>
          </div>
          <div className="price-item-order">
            <DollarCircleFilled
              style={{
                paddingRight: "7px",
                color: "rgba(0, 0, 0, 0.308)",
                fontSize: "1rem",
              }}
            />
            <span style={{ fontWeight: "500" }}>
              {" "}
              {`${data?.payments ? data.payments : 0} đ`}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemOrder;
