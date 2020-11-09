import { debug } from "../utils/constants";

import { actionTypes } from "./actionTypes";

export const initialState = {
  user: null,
  playlist: null,
  playlists: [],
  playing: false,
  displaySearchBar: false,
  searchFilter: "",
  searchResults: [],
  token: "",
  tokenExpiry: 0,
  currentplaybackState: null, //includes current Playing Track => currentplaybackState.item
};

const reducer = (state, action) => {
  process.env.NODE_ENV === "development" &&
    debug.REDUCERS &&
    console.log(action, state);

  switch (action.type) {
    case actionTypes.SET_USER:
      return {
        ...state,
        user: action.payload,
      };

    case actionTypes.SET_TOKEN:
      return {
        ...state,
        token: action.payload,
      };

    case actionTypes.SET_TOKEN_EXPIRY:
      return {
        ...state,
        tokenExpiry: action.payload,
      };

    case actionTypes.SET_PLAYLISTS:
      return {
        ...state,
        playlists: action.payload,
      };

    case actionTypes.SET_PLAYLIST:
      return {
        ...state,
        playlist: action.payload,
      };

    case actionTypes.SET_SEARCH_BAR_DISPLAY:
      return {
        ...state,
        displaySearchBar: action.payload,
      };

    case actionTypes.SET_SEARCH_FILTER:
      return {
        ...state,
        searchFilter: action.payload,
      };

    case actionTypes.SET_SEARCH_RESULTS:
      return {
        ...state,
        searchResults: action.payload,
      };

    case actionTypes.SET_CURRENT_PLAYBACK_STATE:
      return {
        ...state,
        currentplaybackState: action.payload,
      };

    default:
      return state;
  }
};

export default reducer;
