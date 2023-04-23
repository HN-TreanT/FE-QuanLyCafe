import { AuthActions } from "./auth/actions";
import { StateAction } from "./state/actions";
import { OverviewAction } from "./overview/actions";
import { ProductActions } from "./product/actions";
import { PromotionAction } from "./promotion/actions";
import { BillActions } from "./bill/actions";
import { OrderDetailActions } from "./orderDetail/actions";
import { MaterialActions } from "./material/actions";
import { CategoryActions } from "./category/actions";
import { StaffActions } from "./staff/actions";
import { WorkshiftActions } from "./workshift/actions";
import { CustomerActions } from "./cutomer/actions";

const useAction = ()=>{
    const actions = {AuthActions,StateAction,OverviewAction,ProductActions,PromotionAction,BillActions,OrderDetailActions,MaterialActions,CategoryActions,StaffActions,WorkshiftActions,CustomerActions};
  return actions
}
export default useAction;