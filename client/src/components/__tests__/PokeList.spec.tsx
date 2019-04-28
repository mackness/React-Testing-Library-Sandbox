import * as React from "react";
import PokeList from "../PokeList";
import { MockedProvider } from "react-apollo/test-utils";
import {
  render,
  waitForElement,
  cleanup,
  prettyDOM,
  fireEvent
} from "react-testing-library";
import { POKE_LIST } from "../PokeList";

const mocks = [
  {
    request: {
      query: POKE_LIST,
      offset: 0,
      limit: 30
    },
    result: {
      data: {
        pokemonList: require("./mocks/mockPokemonList.json")
      }
    }
  }
];

afterEach(cleanup);

let updateCurrentPokemon: any;
let loadMoreItems: (fetchMore: Function, offset: number) => Promise<any>;
beforeEach(() => {
  loadMoreItems = jest.fn();
  updateCurrentPokemon = jest.fn();
});

describe("components", () => {
  describe("PokeList", () => {
    it("renders without crashing", () => {
      const { container } = render(
        <MockedProvider mocks={mocks}>
          <PokeList updateCurrentPokemon={updateCurrentPokemon} />
        </MockedProvider>
      );
      expect(container).toBeTruthy();
    });

    it("should load mock pokemon data", async () => {
      const { getByText } = render(
        <MockedProvider mocks={mocks} addTypename={false}>
          <PokeList updateCurrentPokemon={updateCurrentPokemon} />
        </MockedProvider>
      );

      const pokemonTextNode = await waitForElement(() => {
        return getByText(/Charmander/i);
      });
      expect(pokemonTextNode).toBeTruthy();
    });

    it("should display the pokemon info panel on click", async () => {
      const { getByText } = render(
        <MockedProvider mocks={mocks} addTypename={false}>
          <PokeList updateCurrentPokemon={updateCurrentPokemon} />
        </MockedProvider>
      );

      const pokemonTextNode = await waitForElement(() => {
        return getByText(/Charmander/i);
      });

      fireEvent.click(pokemonTextNode);

      expect(updateCurrentPokemon).toBeCalledTimes(1);
    });
  });

  it("should load more items when user scrolls past threshold", async () => {
    const { getByText, getByTestId } = render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <PokeList
          updateCurrentPokemon={updateCurrentPokemon}
          loadMoreItems={loadMoreItems}
        />
      </MockedProvider>
    );

    const listContainerNode = await waitForElement(() => {
      return getByTestId("list-container");
    });

    console.log(prettyDOM(listContainerNode));

    fireEvent.scroll(listContainerNode, { y: 2000 });

    expect(loadMoreItems).toBeCalledTimes(1);
  });
});
