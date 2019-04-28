module.exports = {
  Query: {
    async pokemonList(_, { limit, offset }, { dataSources }) {
      return dataSources.pokemonAPI.getAllPokemon(limit, offset);
    },
    async pokemon(_, { name }, { dataSources }) {
      return dataSources.pokemonAPI.getPokemon(name);
    }
  }
};
