import {
  legacy_createStore as createStore,
  combineReducers,
  applyMiddleware,
  compose,
} from "redux";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { createBrowserHistory } from "history";
import { routerReducer } from "react-router-redux";
import createSagaMiddleware from "redux-saga";
import reducers from "../redux/reducers";
import rootSaga from "../redux/sagas";

// const history = syncHistoryWithStore(_history, store)
const history = createBrowserHistory();
const sagaMiddleware = createSagaMiddleware();
const middleware = [sagaMiddleware];

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(
  persistConfig,
  combineReducers({
    ...reducers,
    router: routerReducer,
  })
);

const store = createStore(
  // combineReducers({
  //   ...reducers,
  //   router: ConnectedRouter(history),
  // }),
  persistedReducer,
  composeEnhancers(applyMiddleware(...middleware))
  // applyMiddleware(...middleware)
);
let persistor = persistStore(store);
sagaMiddleware.run(rootSaga);
export { store, history, persistor };
