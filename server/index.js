const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");

const { handleOauthRedirect } = require("./auth");
require("dotenv").config();

const server = require("./createServer")();

server.express.use(cookieParser());

// decode the JWT so we can get the user Id on each request
server.express.use((req, res, next) => {
  const { token } = req.cookies;
  if (token) {
    const { userId } = jwt.verify(token, process.env.APP_SECRET);
    req.userId = userId;
  }
  next();
});

server.express.use(express.static("dist"));

server.use(async (req, res, next) => {
  console.log(req.path);
  if (req.path.startsWith("/graphql") || req.path.startsWith("/playground")) {
    return next();
  }
  if (req.path.startsWith("/oauth2redirect")) {
    return handleOauthRedirect(req, res);
  }
  res.sendFile(path.join(__dirname + "/../dist/index.html"));
});

const options = {
  port: 3000,
  endpoint: "/graphql",
  playground: "/playground"
};

server.start(options, ({ port }) =>
  console.log(`Listening on port localhost:${port}!`)
);
