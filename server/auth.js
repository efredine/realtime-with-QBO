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
  const state = request.query.state;
  const oauthClient = pendingAuthorizations.get(state);
  try {
    const authResponse = await oauthClient.createToken(request.url);
    const userInfo = await oauthClient.getUserInfo();
    const user = { id: state, ...userInfo.getJson() };
    const oauthToken = authResponse.getJson();
    users.set(state, {
      user,
      oauthClient,
      oauthToken
    });
    pendingAuthorizations.delete(state);
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

function authMiddleWare(req, res, next) {
  const { token } = req.cookies;
  if (token) {
    const { userId } = jwt.verify(token, process.env.APP_SECRET);
    req.userId = userId;
    if (users.has(userId)) {
      const { user, oauthClient } = users.get(userId);
      req.user = user;
      req.oauthClient = oauthClient;
    }
  }
  // todo only enable this functionality during development
  if (req.path.startsWith("/graphql")) {
    const { headers } = req;
    const headerEmail = headers["x-email"];
    users.forEach(({ user, oauthClient }, userId) => {
      if (user.email.localeCompare(headerEmail) === 0) {
        req.userId = userId;
        req.user = user;
        req.oauthClient = oauthClient;
      }
    });
  }
  if (req.path.startsWith("/oauth2redirect")) {
    return handleOauthRedirect(req, res);
  }
  next();
}

module.exports = {
  getUser,
  getAuthUri,
  handleSignOut,
  authMiddleWare
};
