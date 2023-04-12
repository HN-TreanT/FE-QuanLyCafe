const types = {
  SET_PROMOTION_EXPIRED: "/promotion/SET_promotion_expired",
  SET_PROMOTION_EXPIRED_SUCCESS: "/promotion/SET_promotion_expired_success",
};

const action = {
  SetPromotionExpired: () => {
    return {
      type: types.SET_PROMOTION_EXPIRED,
    };
  },
  SetPromotionExpiredSuccess: (promotions: any) => {
    return {
      type: types.SET_PROMOTION_EXPIRED_SUCCESS,
      payload: { promotions },
    };
  },
};
const actions = {
  types,
  action,
};
export default actions;
export const PromotionAction = action;
