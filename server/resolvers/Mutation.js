const { signOut, connect } = require("./auth");

const Mutation = {
  signOut,
  connect
};
module.exports = Mutation;
