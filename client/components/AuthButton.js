import React from "react";
import { useMutation } from "react-apollo-hooks";
import gql from "graphql-tag";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

import useCurrentUser from "../hooks/useCurrentUser";
import GET_CURRENT_USER_QUERY from "../graphql/query/getCurrentUser.gql";

const SIGNOUT_MUTATION = gql`
  mutation SIGNOUT_MUTATION {
    signOut {
      message
    }
  }
`;

export default function AuthButton(props) {
  const { currentUser } = useCurrentUser();
  const signOutMutation = useMutation(SIGNOUT_MUTATION, {
    refetchQueries: [{ query: GET_CURRENT_USER_QUERY }]
  });

  if (!currentUser) {
    return null;
  }

  return (
    <>
      <Typography variant="h6" color="inherit">
        Logged in as {currentUser.givenName} {currentUser.familyName}
      </Typography>
      <Button onClick={signOutMutation} color="inherit">
        Sign Out
      </Button>
    </>
  );
}
