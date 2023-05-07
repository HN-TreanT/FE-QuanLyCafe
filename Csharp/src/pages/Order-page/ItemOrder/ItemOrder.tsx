import React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBellConcierge,
  faClock,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { DollarCircleFilled } from "@ant-design/icons";
import "./ItemOrder.scss";
const ItemOrder: React.FC<any> = ({ data }) => {
  const handleClickItemOrder = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    const allCards = document.querySelectorAll(".card-item-order");
    allCards.forEach((card) => {
      if (card !== event.currentTarget) {
        card.classList.remove("click-item-order");
      }
    });
    event.currentTarget.classList.add("click-item-order");
  };
  return (
    <div onClick={handleClickItemOrder} className="card-item-order">
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
        <div className="table-card-item-order">20</div>
        <div className="side-bar-item-order">
          <div className="time-countcustomer">
            <span style={{ paddingRight: "15px" }}>
              <FontAwesomeIcon className="icon-time-customer" icon={faClock} />
              6p
            </span>
            <span>
              <FontAwesomeIcon className="icon-time-customer" icon={faUser} />
              34
            </span>
          </div>
          <div className="price-item-order">
            <DollarCircleFilled
              style={{
                paddingRight: "7px",
                color: "rgba(0, 0, 0, 0.308)",
                fontSize: "1rem",
              }}
            />
            <span style={{ fontWeight: "500" }}>84374 đ</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemOrder;
