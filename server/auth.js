const OAuthClient = require("intuit-oauth");
const { randomBytes } = require("crypto");
const { promisify } = require("util");
const jwt = require("jsonwebtoken");
const fs = require("fs");
const { join } = require("path");

require("dotenv").config();

const randomBytesPromisified = promisify(randomBytes);
const writeFile = promisify(fs.writeFile);
const dataFile = join(__dirname, "/.data");

const config = {
  clientId: process.env.OAUTH_CLIENT_ID,
  clientSecret: process.env.OAUTH_CLIENT_SECRET,
  environment: process.env.OAUTH_ENVIRONMENT,
  redirectUri: process.env.OAUTH_REDIRECT_URI
};

const pendingAuthorizations = new Map();
const users = initializeUsers();

function initializeUsers() {
  try {
    const userData = JSON.parse(fs.readFileSync(dataFile));
    const users = new Map();
    for (let userId of Object.keys(userData)) {
      const { user, oauthToken } = userData[userId];
      const oauthClient = new OAuthClient({
        ...config,
        token: oauthToken
      });
      users.set(userId, { user, oauthToken, oauthClient });
      oauthClient.refresh();
    }
    return users;
  } catch (e) {
    console.log("No data file to read.");
    console.log(e.message);
    return new Map();
  }
}

function saveUsers() {
  const data = {};
  users.forEach(({ user, oauthToken }, userId) => {
    data[userId] = { user, oauthToken };
  });
  const jsonData = JSON.stringify(data);
  writeFile(dataFile, jsonData);
}

function addUser(userId, data) {
  users.set(userId, data);
  saveUsers();
}

function removeUser(userId) {
  users.delete(userId);
  saveUsers();
}

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
    const oauthToken = oauthClient.getToken();
    oauthToken.expires_in = Date.now() + oauthToken.expires_in * 1000;
    oauthToken.x_refresh_token_expires_in =
      Date.now() + oauthToken.x_refresh_token_expires_in * 1000;

    addUser(state, {
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
  removeUser(id);
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
