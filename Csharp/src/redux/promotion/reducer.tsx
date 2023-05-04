import actions from "./actions";
const initState = {};
const PromotionReducer = (state: any = initState, action: any) => {
  switch (action.type) {
    case actions.types.SET_PROMOTION_EXPIRED:
      return {
        ...state,
      };
    case actions.types.LOAD_DATA_SUCCESS:
      return {
        ...state,
        ...{
          promotionExpired: action.payload.promotions,
        },
      };
    case actions.types.LOAD_DATA:
      return {
        ...state,
      };
    case actions.types.SELECTED_PROMOTION_STATE:
      return {
        ...state,
        ...{
          statePromotion: action.payload.data,
        },
      };

    default:
      return state;
  }
};

export default PromotionReducer;
