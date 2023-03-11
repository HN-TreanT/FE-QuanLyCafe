import { AuthActions } from "./auth/actions";
import { StateAction } from "./state/actions";

const useAction = ()=>{
    const actions = {AuthActions,StateAction};
  return actions
}
export default useAction;