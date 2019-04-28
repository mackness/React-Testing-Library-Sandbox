const { RESTDataSource } = require("apollo-datasource-rest");

class PokemonAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = "https://pokeapi.co/api/v2/";
  }

  async getAllPokemon(limit, offset) {
    const { results } = await this.get(
      `pokemon?limit=${limit || 30}&offset=${offset || 0}`
    );
    return Array.isArray(results)
      ? results.map(pokemon => this.pokemonListReducer(pokemon))
      : [];
  }

  async getPokemon(name) {
    const result = await this.get(`pokemon/${name}`);
    if (result) return this.pokemonReducer(result);
  }

  pokemonListReducer(pokemon) {
    return {
      name: pokemon.name
    };
  }

  pokemonReducer(pokemon) {
    return {
      id: pokemon.id,
      name: pokemon.name,
      sprites: {
        backDefault: pokemon.sprites["back_default"],
        frontDefault: pokemon.sprites["front_default"]
      }
    };
  }
}

module.exports = PokemonAPI;
