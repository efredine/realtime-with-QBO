import React from "react";
import { useMutation } from "react-apollo-hooks";
import gql from "graphql-tag";
import GET_CURRENT_USER_QUERY from "../graphql/query/getCurrentUser.gql";

const SIGNOUT_MUTATION = gql`
  mutation SIGNOUT_MUTATION {
    signOut {
      message
    }
  }
`;

export default function AuthButton(props) {
  const signOutMutation = useMutation(SIGNOUT_MUTATION, {
    refetchQueries: [{ query: GET_CURRENT_USER_QUERY }]
  });

  return <button onClick={signOutMutation}>Sign Out</button>;
}
