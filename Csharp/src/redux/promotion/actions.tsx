const types = {
  SET_PROMOTION_EXPIRED: "/promotion/SET_promotion_expired",
  LOAD_DATA_SUCCESS: "/promotion/load-data-success",
  LOAD_DATA: "promotion/load-data",
  SELECTED_PROMOTION_STATE: "promotion/selected-promotion-state",
};

const action = {
  SetPromotionExpired: () => {
    return {
      type: types.SET_PROMOTION_EXPIRED,
    };
  },
  loadDataSuccess: (promotions: any) => {
    return {
      type: types.LOAD_DATA_SUCCESS,
      payload: { promotions },
    };
  },
  loadData: () => {
    return {
      type: types.LOAD_DATA,
    };
  },
  setStatePromotion: (data: any) => {
    return {
      type: types.SELECTED_PROMOTION_STATE,
      payload: { data },
    };
  },
};
const actions = {
  types,
  action,
};
export default actions;
export const PromotionAction = action;
