import React, { useEffect, useContext, useReducer } from "react";
import { AppContext } from "./context";
import { AppActionTypes } from "./reducers";
import PokeInfoPanel from "./components/PokeInfoPanel";
import PokeList from "./components/PokeList";
import ContactForm from "./components/ContactForm";

import {
  UIReducer,
  defaultUserInterfaceState,
  UIActionTypes
} from "./reducers";

const App = () => {
  const context = useContext(AppContext);
  const [state, dispatch] = useReducer(UIReducer, defaultUserInterfaceState);
  const handleSubmit = (props: any) => {
    props.preventDefault();
  };
  const updateCurrentPokemon = (pokemonName: string): void => {
    dispatch({
      type: UIActionTypes.SET_CURRENT_POKEMON,
      payload: {
        pokemonName
      }
    });
  };
  useEffect(() => {
    context.store.dispatch({
      type: AppActionTypes.INIT
    });
  }, [context.store]);
  return (
    <div>
      <h3>Pokèdex</h3>
      <PokeInfoPanel
        currentPokemon={state.currentPokemonName}
        setCurrentPokemon={updateCurrentPokemon}
      />
      <PokeList updateCurrentPokemon={updateCurrentPokemon} />
      {/* <ContactForm handleSubmit={handleSubmit} /> */}
    </div>
  );
};

export default App;
