const { getUser, getAuthUri } = require("../auth");

const Query = {
  currentUser: (parent, args, ctx, info) => {
    return getUser(ctx.request.userId);
  },
  getAuthUri
};
module.exports = Query;
