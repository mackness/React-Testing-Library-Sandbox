import React, { useState, useReducer, useContext } from "react";
import { FixedSizeList as List } from "react-window";
import InfiniteLoader from "react-window-infinite-loader";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import { css } from "emotion";

import { AppContext } from "../context";

import { AppActionTypes } from "../reducers";

import ListRow from "./ListRow";

export const POKE_LIST = gql`
  query GetPokemonListQuery($limit: Int, $offset: Int) {
    pokemonList(limit: $limit, offset: $offset) {
      name
    }
  }
`;

export interface PokeListProps {
  updateCurrentPokemon: (pokemonName: string) => void;
  loadMoreItems: (fetchMore: Function, offset: number) => Promise<any>;
}

const loadMoreItems = (
  fetchMore: Function,
  offset: number,
  limit: number = 30
): Promise<any> => {
  return fetchMore({
    variables: {
      offset,
      limit
    },
    updateQuery: (prev: any, { fetchMoreResult }: any) => {
      if (!fetchMoreResult) return prev;
      return {
        pokemonList: [...prev.pokemonList, ...fetchMoreResult.pokemonList]
      };
    }
  });
};

function PokeList({
  updateCurrentPokemon,
  loadMoreItems
}: PokeListProps): JSX.Element {
  return (
    <div className={css({ border: "solid 1px #000" })}>
      <Query query={POKE_LIST}>
        {({ loading, error, fetchMore, data: { pokemonList } }: any) => {
          if (loading) return <p>loading</p>;
          if (error) return <p>error!</p>;

          return Array.isArray(pokemonList) ? (
            <InfiniteLoader
              isItemLoaded={(index: number) => index < pokemonList.length}
              itemCount={999}
              threshold={10}
              loadMoreItems={() => loadMoreItems(fetchMore, pokemonList.length)}
            >
              {({ onItemsRendered, ref }: any) => (
                <List
                  data-testid="list-container"
                  height={250}
                  width={250}
                  itemSize={35}
                  itemCount={pokemonList.length}
                  onItemsRendered={onItemsRendered}
                  ref={ref}
                >
                  {({ index, style }) => (
                    <ListRow
                      style={style}
                      onClick={() =>
                        updateCurrentPokemon(pokemonList[index].name)
                      }
                      data={pokemonList[index].name}
                    />
                  )}
                </List>
              )}
            </InfiniteLoader>
          ) : (
            <p>no pokemon</p>
          );
        }}
      </Query>
    </div>
  );
}

PokeList.defaultProps = {
  loadMoreItems
};

export default PokeList;
