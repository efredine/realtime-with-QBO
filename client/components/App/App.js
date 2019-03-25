import React from "react";
import { Route } from "react-router-dom";

import AppBar from "../AppBar";
import Connect from "../Connect";
import Index from "../Index";
import PrivateRoute from "../PrivateRoute";

export default function App() {
  return (
    <>
      <AppBar />
      <PrivateRoute path="/" exact component={Index} />
      <Route path="/connect/" component={Connect} />
    </>
  );
}
