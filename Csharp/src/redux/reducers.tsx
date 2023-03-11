import AuthReducer from "./auth/reducer";
import StateReducer from "./state/reducer";

const rootReducer = {
  auth: AuthReducer,
  state: StateReducer,
};

export default rootReducer;
