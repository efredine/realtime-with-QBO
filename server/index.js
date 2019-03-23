const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");

const { authMiddleWare } = require("./auth");
require("dotenv").config();

const server = require("./createServer")();

server.express.use(cookieParser());
server.express.use(authMiddleWare);
server.express.use(express.static("dist"));

server.use(async (req, res, next) => {
  console.log(req.path);
  if (req.path.startsWith("/graphql") || req.path.startsWith("/playground")) {
    return next();
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
