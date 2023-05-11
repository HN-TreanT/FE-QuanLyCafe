import AuthReducer from "./auth/reducer";
import StateReducer from "./state/reducer";
import OverviewReducer from "./overview/reducer";
import ProductReducer from "./product/reducer";
import BillReducer from "./bill/reducer";
import OrderDetailReducer from "./orderDetail/reducer";
import MaterialReducer from "./material/reducer";
import CategoryReducer from "./category/reducer";
import StaffReducer from "./staff/reducer";
import WorkshiftReducer from "./workshift/reducer";
import CustomerReducer from "./cutomer/reducer";
import TableFoodReducer from "./tableFood/reducer";
import ImportGoodReducer from "./importGoods/reducer";
import OrderPageReducer from "./order-page/reducer";
const rootReducer = {
  auth: AuthReducer,
  state: StateReducer,
  overview: OverviewReducer,
  product: ProductReducer,
  bill: BillReducer,
  orderDetail: OrderDetailReducer,
  material: MaterialReducer,
  category: CategoryReducer,
  staff: StaffReducer,
  workshift: WorkshiftReducer,
  customer: CustomerReducer,
  tablefood: TableFoodReducer,
  importgoods: ImportGoodReducer,
  orderpage: OrderPageReducer,
};

export default rootReducer;
