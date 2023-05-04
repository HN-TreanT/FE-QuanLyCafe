import React, { useEffect, useState, useLayoutEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col, Button } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import "./PromotionPage.scss";
import useAction from "../../../../redux/useActions";
import { RouterLinks, serverConfig } from "../../../../const";
import { useNavigate } from "react-router-dom";
import ContentPromotion from "../../../../components/ContentPromotion/ContentPromotion";

const PromotionPage: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const actions = useAction();
  const promotions = useSelector(
    (state: any) => state.promotion.promotionExpired
  );
  const statePromotion = useSelector(
    (state: any) => state.promotion.statePromotion
  );
  useEffect(() => {
    if (statePromotion === "PromotionExp") {
      dispatch(actions.PromotionAction.SetPromotionExpired());
    }

    dispatch(actions.PromotionAction.loadData());
  }, [dispatch, actions.PromotionAction, statePromotion]);
  return (
    <div className="promotion-page">
      <Row gutter={[0, 15]}>
        <Col span={24}>
          <div className="title-button-promotion-page">
            <div className="title-promotion-page">Danh sách khuyến mãi</div>
            <Button
              //   onClick={handleClickButtonAddProduct}
              type="primary"
              className="button-add-product"
            >
              <FontAwesomeIcon icon={faPlus} />
              <span> Thêm khuyến mãi</span>
            </Button>
          </div>
        </Col>
        <ContentPromotion value={promotions} />
      </Row>
    </div>
  );
};
export default PromotionPage;
