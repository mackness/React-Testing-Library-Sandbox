import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { ApolloClient } from "apollo-client";
import gql from "graphql-tag";
import { InMemoryCache } from "apollo-cache-inmemory";
import { HttpLink } from "apollo-link-http";
import { ApolloProvider, Query } from "react-apollo";
import styled from "@emotion/styled";
import { Global, css } from "@emotion/core";

import { AppContext, store } from "./context";
import App from "./App";
import Login from "./components/Login";

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

client.cache.writeData({
  data: {
    isLoggedIn: !!localStorage.getItem("token")
  }
});

const IS_LOGGED_IN = gql`
  query IsUserLoggedIn {
    isLoggedIn @client
  }
`;

const Container = styled("div")({
  width: 250,
  minHeight: 300,
  borderLeft: "solid 3px red",
  borderRight: "solid 3px red",
  borderTop: "solid 3px red",
  borderBottom: "solid 3px red",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "column"
});

const tree = (
  <>
    <Global
      styles={css`
        body {
          margin: 0;
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto",
            "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans",
            "Helvetica Neue", sans-serif;
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
        }
      `}
    />
    <AppContext.Provider value={{ store }}>
      <ApolloProvider client={client}>
        <Provider store={store}>
          <Container>
            <Query query={IS_LOGGED_IN}>
              {({ data }: any) => {
                console.log(data);
                return data.isLoggedIn ? <App /> : <Login />;
              }}
            </Query>
          </Container>
        </Provider>
      </ApolloProvider>
    </AppContext.Provider>
  </>
);

ReactDOM.render(tree, document.getElementById("root"));
