import React, { SyntheticEvent } from "react";
import { Mutation, ApolloConsumer } from "react-apollo";
import gql from "graphql-tag";

import styled from "@emotion/styled";

import LoginForm from "./LoginForm";

export const LOGIN_USER = gql`
  mutation login($email: String!) {
    login(email: $email)
  }
`;

interface LoginProps {
  submitHandler: (event: any, login: Function) => void;
}

function submitHandler(event: any, login: Function): void {
  login({
    variables: { email: event.target.querySelector("input[type=text]").value }
  });
}

export default function Login({ submitHandler }: LoginProps): JSX.Element {
  return (
    <ApolloConsumer>
      {client => {
        return (
          <Mutation
            mutation={LOGIN_USER}
            onCompleted={({ login }: any) => {
              localStorage.setItem("token", login);
              client.writeData({ data: { isLoggedIn: true } });
            }}
          >
            {(login: any, { loading, error }: any) => {
              if (loading) return <p>loading...</p>;
              if (error) return <p>an error occurred...</p>;
              return (
                <>
                  <Title>Pokèdex</Title>
                  <LoginForm
                    submitHandler={(event: SyntheticEvent) =>
                      submitHandler(event, login)
                    }
                  />
                </>
              );
            }}
          </Mutation>
        );
      }}
    </ApolloConsumer>
  );
}

Login.defaultProps = {
  submitHandler
};

const Title = styled("h3")({
  marginBottom: 8
});
