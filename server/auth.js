const OAuthClient = require("intuit-oauth");
const { randomBytes } = require("crypto");
const { promisify } = require("util");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const randomBytesPromisified = promisify(randomBytes);
const config = {
  clientId: process.env.OAUTH_CLIENT_ID,
  clientSecret: process.env.OAUTH_CLIENT_SECRET,
  environment: process.env.OAUTH_ENVIRONMENT,
  redirectUri: process.env.OAUTH_REDIRECT_URI
};

const pendingAuthorizations = new Map();
const users = new Map();

async function getAuthUri() {
  const state = (await randomBytesPromisified(20)).toString("hex");
  const oauthClient = new OAuthClient(config);
  pendingAuthorizations.set(state, oauthClient);
  return {
    uri: oauthClient.authorizeUri({
      scope: [
        OAuthClient.scopes.OpenId,
        OAuthClient.scopes.Profile,
        OAuthClient.scopes.Email,
        OAuthClient.scopes.Accounting
      ],
      state
    })
  };
}

async function handleOauthRedirect(request, response) {
  // const parsedUrl = parse(url, true);
  const state = request.query.state;
  const oauthClient = pendingAuthorizations.get(state);
  try {
    const authResponse = await oauthClient.createToken(request.url);
    const user = { id: state, name: "Eric" };
    const oauthToken = authResponse.getJson();
    users.set(state, {
      user,
      oauthToken
    });
    const token = jwt.sign({ userId: user.id }, process.env.APP_SECRET);
    response.cookie("token", token, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 365
    });
  } catch (e) {
    console.log(e);
  }
  return response.redirect(302, "/");
}

function getUser(id) {
  const userRecord = users.get(id);
  return userRecord ? userRecord.user : null;
}

function handleSignOut(request, response) {
  response.clearCookie("token");
  const id = request.userId;
  users.delete(id);
}

module.exports = {
  getUser,
  getAuthUri,
  handleSignOut,
  handleOauthRedirect
};