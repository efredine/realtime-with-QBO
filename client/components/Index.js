import React from "react";
import gql from "graphql-tag";
import { useQuery } from "react-apollo-hooks";

const HELLO_ERIC = gql`
  query HELLO_ERIC {
    hello(name: "Eric")
  }
`;

export default function Index() {
  const { data, loading, error } = useQuery(HELLO_ERIC);
  if (loading) {
    return <p>Loading...</p>;
  }
  if (error) {
    return <p>ERROR</p>;
  }
  const { hello } = data;
  return <h2>{hello}</h2>;
}
