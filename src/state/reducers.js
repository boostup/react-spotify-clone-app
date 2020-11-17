import { debug } from "../utils/constants";

import { actionTypes } from "./actionTypes";

export const initialState = {
  currentplaybackState: null, //includes current Playing Track => currentplaybackState.item
  displayItemToolbar: false,
  displaySearchBar: false,
  isItemPage: false,
  item: null, //an object that holds either an album or playlist information, used in the `ItemPage`
  playlists: [],
  playlistsFeatured: [],
  playing: false,
  savedTracks: [],
  searchResults: [],
  token: "",
  tokenExpiry: 0,
  topTracks: [],
  recentTracks: [],
  recommendedTracks: [],
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

    case actionTypes.SET_MY_PLAYLISTS_FEATURED:
      return {
        ...state,
        playlistsFeatured: action.payload,
      };

    case actionTypes.SET_ITEM:
      return {
        ...state,
        item: action.payload,
      };

    case actionTypes.SET_PLAYLIST_IS_FOLLOWER:
      return {
        ...state,
        playlist: {
          ...state.playlist,
          isFollower: action.payload,
        },
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

    case actionTypes.SET_MY_RECOMMENDED_TRACKS:
      return {
        ...state,
        recommendedTracks: action.payload,
      };

    case actionTypes.SET_SEARCH_BAR_DISPLAY:
      return {
        ...state,
        displaySearchBar: action.payload,
      };

    case actionTypes.SET_ITEM_TOOLBAR_DISPLAY:
      return {
        ...state,
        displayItemToolbar: action.payload,
      };

    case actionTypes.SET_IS_ITEM_PAGE:
      return {
        ...state,
        isItemPage: action.payload,
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
