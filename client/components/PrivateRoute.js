import React from "react";
import { Route, Redirect } from "react-router-dom";

import useCurrentUser from "../hooks/useCurrentUser";

function PrivateRoute({ component: Component, ...rest }) {
  const { currentUser, loading, error } = useCurrentUser();
  if (loading) {
    return <p>Loading...</p>;
  }
  if (error) {
    return <p>ERROR</p>;
  }
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
