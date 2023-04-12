import actions from "./actions";
const initState = {};
const PromotionReducer = (state: any = initState, action: any) => {
  switch (action.type) {
    case actions.types.SET_PROMOTION_EXPIRED:
      return {
        ...state,
      };
    case actions.types.SET_PROMOTION_EXPIRED_SUCCESS:
      return {
        ...state,
        ...{
          promotionExpired: action.payload.promotions,
        },
      };

    default:
      return state;
  }
};

export default PromotionReducer;
