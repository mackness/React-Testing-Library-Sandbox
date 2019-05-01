import { createStore, applyMiddleware, compose, Store } from "redux";
import rootReducer from "../reducers";
import logger from "redux-logger";

import { EnvType } from "../types";

declare var module: any;

export default function configureStore() {
  let store: Store;
  if (process.env.NODE_ENV === EnvType.TEST) {
    store = compose()(createStore)(rootReducer);
  } else {
    store = compose(applyMiddleware(logger))(createStore)(rootReducer);
  }

  if (module.hot) {
    module.hot.accept("../reducers", () =>
      store.replaceReducer(require("../reducers"))
    );
  }

  return store;
}
