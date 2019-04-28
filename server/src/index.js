const { ApolloServer } = require("apollo-server");
const typeDefs = require("./schema");
const resolvers = require("./resolvers");

const PokemonAPI = require("./datasources/pokemon");

const server = new ApolloServer({
  context: async ({ req }) => {
    return req;
  },
  tracing: true,
  typeDefs,
  resolvers,
  dataSources: () => ({
    pokemonAPI: new PokemonAPI()
  })
});

server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
