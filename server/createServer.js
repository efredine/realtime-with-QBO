const { GraphQLServer } = require("graphql-yoga");
const Query = require("./resolvers/Query");
const Mutation = require("./resolvers/Mutation");
const resolvers = { Query, Mutation };

function createServer() {
  return new GraphQLServer({
    typeDefs: "server/schema.graphql",
    resolvers,
    context: req => ({ ...req })
  });
}

module.exports = createServer;
