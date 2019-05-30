const { GraphQLServer } = require('graphql-yoga');;
const Query = require('./resolvers/Query');
const Mutation = require('./resolvers/Mutation');
const Team = require('./resolvers/Team');
const Game = require('./resolvers/Game');
const Sport = require('./resolvers/Sport');
const Odd = require('./resolvers/Odd');
const User = require('./resolvers/User');
const WagerType = require('./resolvers/WagerType');
const Ledger = require('./resolvers/Ledger');
const Outcome = require('./resolvers/Outcome');
const Subscription = require('./resolvers/Subscription');
const { prisma } = require('./generated/prisma-client');

const resolvers = {
    Query,
    Mutation,
    Subscription,
    Team,
    Game,
    Sport,
    Odd,
    User,
    WagerType,
    Ledger,
    Outcome,
};

const server = new GraphQLServer({
    typeDefs: './schema.graphql',
    resolvers,
    context: request => {
        return {
          ...request,
          prisma,
        }
      },
});

server.start(() => console.log('Server is running on localhost:4000'));