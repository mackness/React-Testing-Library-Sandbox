import React, { useEffect, useContext } from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";

export const POKEMON_QUERY = gql`
  query GetPokemonQuery($name: String!) {
    pokemon(name: $name) {
      name
      id
      sprites {
        frontDefault
        backDefault
      }
    }
  }
`;

export interface PokePanelProps {
  currentPokemon: string;
  setCurrentPokemon: (pokemon: string) => void;
}

const PokeInfoPanel = ({
  currentPokemon,
  setCurrentPokemon
}: PokePanelProps) => {
  if (!currentPokemon) return null;
  return (
    <Query query={POKEMON_QUERY} variables={{ name: currentPokemon }}>
      {({ loading, error, data: { pokemon } }: any) => {
        if (loading) return <p>loading...</p>;
        if (error) return <p>error...</p>;
        return (
          <>
            <p onClick={() => setCurrentPokemon("")}>close</p>
            <p>{pokemon.name}</p>
            <p>{pokemon.id}</p>
            <img
              src={pokemon.sprites.frontDefault}
              alt="front default sprite"
            />
            <img src={pokemon.sprites.backDefault} alt="back default sprite" />
          </>
        );
      }}
    </Query>
  );
};

export default PokeInfoPanel;
