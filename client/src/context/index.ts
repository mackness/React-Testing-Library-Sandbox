import * as React from "react";
import configureStore from "../store/configureStore";

const store = configureStore();

const AppContext = React.createContext({
  store
});

export { store, AppContext };
