const OAuthClient = require("intuit-oauth");

function makeApiCall({ request: { oauthClient } }, uri) {
  if (!oauthClient) {
    throw new Error(
      "A connected user with an oauthClient is required to make an api call."
    );
  }
  const realmId = oauthClient.getToken().realmId;
  const host =
    oauthClient.environment == "sandbox"
      ? OAuthClient.environment.sandbox
      : OAuthClient.environment.production;
  const url = host + "/v3/company/" + realmId + "/" + uri;

  return oauthClient
    .makeApiCall({
      url
    })
    .then(response => {
      const json = response.getJson();
      console.log({ url, json });
      return json;
    })
    .catch(error => {
      console.error({ url, error });
    });
}

function apiQuery(ctx, query) {
  return makeApiCall(ctx, "query?query=" + encodeURIComponent(query));
}

module.exports = {
  makeApiCall,
  apiQuery
};
