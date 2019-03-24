const { getUser, getAuthUri } = require("../auth");
const { apiQuery } = require("../api");

const API_BILL_QUERY =
  "SELECT * FROM Bill ORDER BY MetaData.LastUpdatedTime DESC";

const Query = {
  currentUser: (parent, args, ctx, info) => {
    return getUser(ctx.request.userId);
  },
  getAuthUri,
  getBills: async (parent, args, ctx, info) => {
    const result = await apiQuery(ctx, API_BILL_QUERY);
    const bills = result.QueryResponse.Bill;
    return bills;
  }
};
module.exports = Query;
