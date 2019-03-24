import React, { useState } from "react";
import { useQuery, useApolloClient } from "react-apollo-hooks";
import { Redirect } from "react-router-dom";
import gql from "graphql-tag";
import GET_CURRENT_USER_QUERY from "../graphql/query/getCurrentUser.gql";

const GET_AUTH_URI = gql`
  query GET_AUTH_URI {
    getAuthUri {
      uri
    }
  }
`;

export default function Connect(props) {
  const { data, loading, error } = useQuery(GET_CURRENT_USER_QUERY);
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
  const { currentUser } = data;
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
      <button onClick={connect} disabled={connecting}>
        Connect to QuickBooksOnline
      </button>
    </>
  );
}
