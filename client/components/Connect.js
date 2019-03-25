import React, { useState } from "react";
import { useApolloClient } from "react-apollo-hooks";
import { Redirect } from "react-router-dom";
import gql from "graphql-tag";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import styled from "styled-components";

import useCurrentUser from "../hooks/useCurrentUser";

const GET_AUTH_URI = gql`
  query GET_AUTH_URI {
    getAuthUri {
      uri
    }
  }
`;

const StyledConnectPage = styled(Paper)`
  width: 100%;
  margin-top: 3rem;
  h2 {
    padding-left: 24px;
    padding-top: 1.5rem;
  }
  button {
    margin: 24px;
  }
`;

export default function Connect(props) {
  const { currentUser, loading, error } = useCurrentUser();
  const [connecting, setConnecting] = useState(false);
  const client = useApolloClient();

  const connect = () => {
    setConnecting(true);
    client.query({ query: GET_AUTH_URI }).then(({ data }) => {
      const redirectUri = data.getAuthUri.uri;
      window.location.href = redirectUri;
    });
  };

  if (loading) {
    return <p>Loading...</p>;
  }
  if (error) {
    return <p>ERROR</p>;
  }
  if (currentUser) {
    return (
      <Redirect
        to={{
          pathname: "/",
          state: { from: props.location }
        }}
      />
    );
  }
  return (
    <StyledConnectPage>
      <Typography variant="h2" color="inherit">
        Connect
      </Typography>
      <Button
        onClick={connect}
        disabled={connecting}
        variant="contained"
        color="primary"
      >
        Connect to QuickBooksOnline
      </Button>
    </StyledConnectPage>
  );
}
