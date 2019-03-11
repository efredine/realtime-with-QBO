import React from "react";
import PropTypes from "prop-types";
import AuthButton from "./AuthButton";
function Index(props) {
  return (
    <>
      <h2>hello {props.currentUser.name}</h2>
      <AuthButton />
    </>
  );
}

Index.propTypes = {
  currentUser: PropTypes.object.isRequired
};
export default Index;
