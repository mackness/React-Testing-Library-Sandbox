module.exports = {
  Query: {
    async pokemonList(_, { limit, offset }, { dataSources }) {
      return dataSources.pokemonAPI.getAllPokemon(limit, offset);
    },
    async pokemon(_, { name }, { dataSources }) {
      return dataSources.pokemonAPI.getPokemon(name);
    }
  },
  Mutation: {
    async login(_, { email }, { dataSources }) {
      const user = await dataSources.userAPI.findOrCreateUser({ email });
      if (user) {
        return Buffer.from(email).toString("base64");
      }
    }
  }
};
