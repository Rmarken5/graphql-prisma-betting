const { GraphQLServer } = require('graphql-yoga');;
const Query = require('./resolvers/Query');

const resolvers = {
    Query,
};

const server = new GraphQLServer({
    typeDefs: './schema.graphql',
    resolvers,
});

server.start(() => console.log('Server is running on localhost:4000'));