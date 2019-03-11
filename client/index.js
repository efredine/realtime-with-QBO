import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route } from "react-router-dom";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo-hooks";
import Connect from "./components/Connect";
import Index from "./components/Index";
import PrivateRoute from "./components/PrivateRoute";

const client = new ApolloClient({
  uri: "http://localhost:3000/graphql"
});

function App() {
  return (
    <>
      <PrivateRoute path="/" exact component={Index} />
      <Route path="/connect/" component={Connect} />
    </>
  );
}

ReactDOM.render(
  <ApolloProvider client={client}>
    <Router>
      <App />
    </Router>
  </ApolloProvider>,
  document.getElementById("root")
);
