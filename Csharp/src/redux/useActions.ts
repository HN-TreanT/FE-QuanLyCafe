import { AuthActions } from "./auth/actions";
import { StateAction } from "./state/actions";
import { OverviewAction } from "./overview/actions";
import { ProductActions } from "./product/actions";
import { PromotionAction } from "./promotion/actions";
import { BillActions } from "./bill/actions";

const useAction = ()=>{
    const actions = {AuthActions,StateAction,OverviewAction,ProductActions,PromotionAction,BillActions};
  return actions
}
export default useAction;