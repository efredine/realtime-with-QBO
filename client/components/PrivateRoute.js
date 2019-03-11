import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useQuery } from "react-apollo-hooks";
import ME_QUERY from "../graphql/query/me.gql";

function PrivateRoute({ component: Component, ...rest }) {
  const { data, loading, error } = useQuery(ME_QUERY);
  if (loading) {
    return <p>Loading...</p>;
  }
  if (error) {
    return <p>ERROR</p>;
  }
  const { me } = data;
  return (
    <Route
      {...rest}
      render={props =>
        me ? (
          <Component currentUser={me} {...props} />
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
