import AuthReducer from "./auth/reducer";
import StateReducer from "./state/reducer";
import OverviewReducer from "./overview/reducer";

const rootReducer = {
  auth: AuthReducer,
  state: StateReducer,
  overview: OverviewReducer,
};

export default rootReducer;
