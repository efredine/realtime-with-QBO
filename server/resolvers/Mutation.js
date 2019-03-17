const jwt = require("jsonwebtoken");

const { signOut, connect } = require("./auth");

const Mutation = {
  signOut: (parent, args, ctx, info) => {
    ctx.response.clearCookie("token");
    signOut();
  },
  connect: (parent, args, ctx, info) => {
    const user = connect();
    // 3. generate the JWT Token
    const token = jwt.sign({ userId: user.id }, process.env.APP_SECRET);
    // 4. Set the cookie with the token
    ctx.response.cookie("token", token, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 365
    });
    return user;
  }
};
module.exports = Mutation;
