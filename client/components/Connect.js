import React, { useState } from "react";
import { useApolloClient } from "react-apollo-hooks";
import { Redirect } from "react-router-dom";
import gql from "graphql-tag";
import Button from "@material-ui/core/Button";

import useCurrentUser from "../hooks/useCurrentUser";

const GET_AUTH_URI = gql`
  query GET_AUTH_URI {
    getAuthUri {
      uri
    }
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
    <>
      <h2>Connect</h2>
      <Button
        onClick={connect}
        disabled={connecting}
        variant="contained"
        color="primary"
      >
        Connect to QuickBooksOnline
      </Button>
    </>
  );
}
