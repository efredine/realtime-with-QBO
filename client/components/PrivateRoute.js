import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useQuery } from "react-apollo-hooks";
import GET_CURRENT_USER_QUERY from "../graphql/query/getCurrentUser.gql";

function PrivateRoute({ component: Component, ...rest }) {
  const { data, loading, error } = useQuery(GET_CURRENT_USER_QUERY);
  if (loading) {
    return <p>Loading...</p>;
  }
  if (error) {
    return <p>ERROR</p>;
  }
  const { currentUser } = data;
  return (
    <Route
      {...rest}
      render={props =>
        currentUser ? (
          <Component currentUser={currentUser} {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/connect",
              state: { from: props.location }
            }}
          />
        )
      }
    />
  );
}

export default PrivateRoute;
