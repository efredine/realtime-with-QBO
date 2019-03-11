const { getMe } = require("./auth");

const Query = {
  hello: (_, { name }) => `Hello ${name || "World"}`,
  me: getMe
};
module.exports = Query;
