import { debug } from "../utils/constants";

import { actionTypes } from "./actionTypes";

export const initialState = {
  currentplaybackState: null, //includes current Playing Track => currentplaybackState.item
  displayPlaylistToolbar: false,
  displaySearchBar: false,
  isPlaylistPage: false,
  playlist: null,
  playlists: [],
  playing: false,
  savedTracks: [],
  searchResults: [],
  token: "",
  tokenExpiry: 0,
  topTracks: [],
  recentTracks: [],
  user: null,
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

    case actionTypes.SET_MY_PLAYLISTS:
      return {
        ...state,
        playlists: action.payload,
      };

    case actionTypes.SET_PLAYLIST:
      return {
        ...state,
        playlist: action.payload,
      };

    case actionTypes.SET_MY_RECENT_TRACKS:
      return {
        ...state,
        recentTracks: action.payload,
      };

    case actionTypes.SET_MY_TOP_TRACKS:
      return {
        ...state,
        topTracks: action.payload,
      };

    case actionTypes.SET_MY_SAVED_TRACKS:
      return {
        ...state,
        savedTracks: action.payload,
      };

    case actionTypes.SET_SEARCH_BAR_DISPLAY:
      return {
        ...state,
        displaySearchBar: action.payload,
      };

    case actionTypes.SET_PLAYLIST_TOOLBAR_DISPLAY:
      return {
        ...state,
        displayPlaylistToolbar: action.payload,
      };

    case actionTypes.SET_IS_PLAYLIST_PAGE:
      return {
        ...state,
        isPlaylistPage: action.payload,
      };

    case actionTypes.SET_HEADER_SCROLLED:
      return {
        ...state,
        headerScrolled: action.payload,
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
