const jwt = require("jsonwebtoken");

const { handleSignOut } = require("../auth");

const Mutation = {
  signOut: (parent, args, ctx, info) => {
    handleSignOut(ctx.request, ctx.response);
  }
};
module.exports = Mutation;
