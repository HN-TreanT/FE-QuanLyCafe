import { AuthActions } from "./auth/actions";
import { StateAction } from "./state/actions";
import { OverviewAction } from "./overview/actions";

const useAction = ()=>{
    const actions = {AuthActions,StateAction,OverviewAction};
  return actions
}
export default useAction;