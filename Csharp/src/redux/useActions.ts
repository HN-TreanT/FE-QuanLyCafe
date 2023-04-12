import { AuthActions } from "./auth/actions";
import { StateAction } from "./state/actions";
import { OverviewAction } from "./overview/actions";
import { ProductActions } from "./product/actions";
import { PromotionAction } from "./promotion/actions";

const useAction = ()=>{
    const actions = {AuthActions,StateAction,OverviewAction,ProductActions,PromotionAction};
  return actions
}
export default useAction;