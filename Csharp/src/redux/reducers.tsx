import AuthReducer from "./auth/reducer";
import StateReducer from "./state/reducer";
import OverviewReducer from "./overview/reducer";
import ProductReducer from "./product/reducer";
import PromotionReducer from "./promotion/reducer";
import BillReducer from "./bill/reducer";
import OrderDetailReducer from "./orderDetail/reducer";
import MaterialReducer from "./material/reducer";
import CategoryReducer from "./category/reducer";
import StaffReducer from "./staff/reducer";
import WorkshiftReducer from "./workshift/reducer";
const rootReducer = {
  auth: AuthReducer,
  state: StateReducer,
  overview: OverviewReducer,
  product: ProductReducer,
  promotion: PromotionReducer,
  bill: BillReducer,
  orderDetail: OrderDetailReducer,
  material: MaterialReducer,
  category: CategoryReducer,
  staff: StaffReducer,
  workshift: WorkshiftReducer,
};

export default rootReducer;
