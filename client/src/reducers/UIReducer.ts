interface UIState {
  isInfoPanelOpen: boolean;
  currentPokemonName: string;
}

export enum UIActionTypes {
  SHOW_INFO_PANEL = "ui/SHOW_INFO_PANEL",
  HIDE_INFO_PANEL = "ui/HIDE_INFO_PANEL",
  SET_CURRENT_POKEMON = "ui/SET_CURRENT_POKEMON"
}

export const defaultUserInterfaceState = {
  isInfoPanelOpen: false,
  currentPokemonName: ""
};

export default function UIRedcuer(
  state: UIState = defaultUserInterfaceState,
  action: any
) {
  switch (action.type) {
    case UIActionTypes.SHOW_INFO_PANEL:
      return {
        ...state,
        isInfoPanelOpen: true
      };
    case UIActionTypes.HIDE_INFO_PANEL:
      return {
        ...state,
        isInfoPanelOpen: false
      };
    case UIActionTypes.SET_CURRENT_POKEMON:
      return {
        ...state,
        currentPokemonName: action.payload.pokemonName
      };
    default:
      return state;
  }
}
