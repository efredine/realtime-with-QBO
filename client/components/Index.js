import React from "react";
import PropTypes from "prop-types";
import AuthButton from "./AuthButton";
import BillsContainer from "./Bills";

function Index({ currentUser }) {
  console.log({ currentUser });
  return <BillsContainer />;
}

Index.propTypes = {
  currentUser: PropTypes.object.isRequired
};
export default Index;
