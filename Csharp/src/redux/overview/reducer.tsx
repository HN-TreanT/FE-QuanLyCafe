import actions from "./actions";
const initState = {
  overviewData: {
    CustomerNumber: "0",
    OrderNumber: "0",
    ProductNumber: "0",
    Revenue: "0",
    MoneyProduct: "0",
    Sale: "0",
    MoneyMaterial: "0",
  },
  revenueOverview: {},
  timeState: 1,
};
const OverviewReducer = (state: any = initState, action: any) => {
  switch (action.type) {
    case actions.types.TIME_STATE:
      return {
        ...state,
        ...{
          timeState: action.payload.timeState,
        },
      };
    case actions.types.LOAD_DATA:
      return {
        ...state,
      };
    case actions.types.LOAD_DATA_SUCCESS:
      return {
        ...state,
        ...{
          overviewData: action.payload.data,
        },
      };
    case actions.types.REvENUE_OVERVIEW:
      return {
        ...state,
        ...{
          revenueOverview: action.payload.data,
        },
      };
    default:
      return state;
  }
};

export default OverviewReducer;
