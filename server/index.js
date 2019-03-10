const { GraphQLServer } = require("graphql-yoga");
const express = require("express");
const path = require("path");

const typeDefs = `
  type Query {
    hello(name: String): String!
  }
`;

const resolvers = {
  Query: {
    hello: (_, { name }) => `Hello ${name || "World"}`
  }
};

const server = new GraphQLServer({ typeDefs, resolvers });

server.express.use(express.static("dist"));

server.use((req, res, next) => {
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
