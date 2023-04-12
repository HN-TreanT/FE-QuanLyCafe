import AuthReducer from "./auth/reducer";
import StateReducer from "./state/reducer";
import OverviewReducer from "./overview/reducer";
import ProductReducer from "./product/reducer";
import PromotionReducer from "./promotion/reducer";
const rootReducer = {
  auth: AuthReducer,
  state: StateReducer,
  overview: OverviewReducer,
  product: ProductReducer,
  promotion: PromotionReducer,
};

export default rootReducer;
