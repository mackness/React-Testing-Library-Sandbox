import * as React from "react";
import { MockedProvider } from "react-apollo/test-utils";
import {
  render,
  cleanup,
  waitForElement,
  prettyDOM,
  getByAltText,
  fireEvent
} from "react-testing-library";
import PokeInfoPanel, { POKEMON_QUERY, PokePanelProps } from "../PokeInfoPanel";

const currentPokemon = "Charmander";

const mocks = [
  {
    request: {
      query: POKEMON_QUERY,
      variables: {
        name: currentPokemon
      }
    },
    result: {
      data: {
        pokemon: {
          __typename: "pokemon",
          name: currentPokemon,
          id: 1,
          sprites: {
            __typename: "sprites",
            frontDefault: "http://localhost:80/img/src/charmander.jpg",
            backDefault: "http://localhost:80/img/src/charmander.jpg"
          }
        }
      }
    }
  }
];

afterEach(cleanup);

let setCurrentPokemon: (pokemon: string) => void;
beforeEach(() => {
  setCurrentPokemon = jest.fn();
});

describe("components", () => {
  describe("PokeInfoPanel", () => {
    it("renders without crashing", () => {
      const tree = (
        <MockedProvider mocks={mocks}>
          <PokeInfoPanel
            currentPokemon={currentPokemon}
            setCurrentPokemon={setCurrentPokemon}
          />
        </MockedProvider>
      );
      const { container } = render(tree);
      expect(container).toBeDefined();
    });

    it("renders the current pokemon's information", async () => {
      const tree = (
        <MockedProvider mocks={mocks}>
          <PokeInfoPanel
            currentPokemon={currentPokemon}
            setCurrentPokemon={setCurrentPokemon}
          />
        </MockedProvider>
      );
      const { getByText, container } = render(tree);

      const pokemonNameNode = await waitForElement(() => {
        return getByText(/Charmander/i);
      });

      expect(pokemonNameNode).toBeDefined();
      expect(getByText(/1/i)).toBeDefined();
      expect(getByAltText(container, /front default sprite/i));
    });

    it("calls the setCurrentPokemon callback when close is clicked", async () => {
      const tree = (
        <MockedProvider mocks={mocks}>
          <PokeInfoPanel
            currentPokemon={currentPokemon}
            setCurrentPokemon={setCurrentPokemon}
          />
        </MockedProvider>
      );

      const { getByText } = render(tree);

      const closeNode = await waitForElement(() => {
        return getByText(/close/i);
      });

      expect(closeNode).toBeDefined();

      fireEvent.click(closeNode);

      expect(setCurrentPokemon).toBeCalledTimes(1);
    });
  });
});
