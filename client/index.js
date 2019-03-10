import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Connect from "./components/Connect";
import Index from "./components/Index";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo-hooks";

const client = new ApolloClient({
  uri: "http://localhost:3000/graphql"
});

function App() {
  return (
    <>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/connect/">Connect</Link>
          </li>
        </ul>
      </nav>

      <Route path="/" exact component={Index} />
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
