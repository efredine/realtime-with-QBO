import React from "react";
import { useQuery, useMutation } from "react-apollo-hooks";
import { Redirect } from "react-router-dom";
import gql from "graphql-tag";
import ME_QUERY from "../graphql/query/me.gql";

const CONNECT_MUTATION = gql`
  mutation CONNECT_MUTATION {
    connect {
      name
    }
  }
`;

export default function Connect(props) {
  const connectMutation = useMutation(CONNECT_MUTATION, {
    refetchQueries: [{ query: ME_QUERY }]
  });
  const { data, loading, error } = useQuery(ME_QUERY);
  if (loading) {
    return <p>Loading...</p>;
  }
  if (error) {
    return <p>ERROR</p>;
  }
  const { me } = data;
  if (me) {
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
      <button onClick={connectMutation}>Connect</button>
    </>
  );
}
