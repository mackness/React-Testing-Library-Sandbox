const { gql } = require("apollo-server");

const typeDefs = gql`
  type Pokemon {
    id: Int
    name: String!
    sprites: Sprite
  }
  type Sprite {
    backDefault: String!
    frontDefault: String!
  }
  type Query {
    pokemonList(limit: Int, offset: Int): [Pokemon]!
    pokemon(name: String!): Pokemon!
  }
  type Mutation {
    login(email: String): String # login token
  }
`;

module.exports = typeDefs;
