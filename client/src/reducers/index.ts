import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
import UIReducer, {
  defaultUserInterfaceState,
  UIActionTypes
} from "./UIReducer";

export enum AppActionTypes {
  INIT = "app/INIT",
  SET_CURRENT_POKEMON = "app/SET_CURRENT_POKEMON"
}

export interface AppState {
  init: boolean;
  currentPokemon: string;
}

const __DEFAULT_STATE__ = {
  init: false,
  currentPokemon: ""
};

const app = function(state: AppState = __DEFAULT_STATE__, action: any) {
  switch (action.type) {
    case AppActionTypes.INIT:
      return {
        ...state,
        init: true
      };
    case AppActionTypes.SET_CURRENT_POKEMON:
      return {
        ...state,
        currentPokemon: action.payload.pokemonName
      };
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  form: formReducer,
  app
});

export { UIReducer, defaultUserInterfaceState, UIActionTypes };
export default rootReducer;
