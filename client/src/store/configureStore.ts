import { createStore, applyMiddleware, compose } from "redux";
import rootReducer from "../reducers";
import logger from "redux-logger";

declare var module: any;

export default function configureStore() {
  const store = compose(applyMiddleware(logger))(createStore)(rootReducer);

  if (module.hot) {
    module.hot.accept("../reducers", () =>
      store.replaceReducer(require("../reducers"))
    );
  }

  return store;
}
