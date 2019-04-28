import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { ApolloClient } from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { HttpLink } from "apollo-link-http";
import { ApolloProvider } from "react-apollo";

import { AppContext, store } from "./context";
import "./index.css";
import App from "./App";

const client = new ApolloClient({
  cache: new InMemoryCache({
    addTypename: false
  }),
  link: new HttpLink({
    uri: "http://localhost:4000",
    headers: {
      authorization: 123
    }
  })
});

const tree = (
  <AppContext.Provider value={{ store }}>
    <ApolloProvider client={client}>
      <Provider store={store}>
        <App />
      </Provider>
    </ApolloProvider>
  </AppContext.Provider>
);

ReactDOM.render(tree, document.getElementById("root"));
