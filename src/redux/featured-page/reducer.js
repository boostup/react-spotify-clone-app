import { featuredPageActionTypes as actionTypes } from "./types.js";

const initialState = {
  isFetching: false,
  error: null,
  success: null,
  playlistsFeatured: null,
  recommendedTracks: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_FEATURED_PAGE_DATA_START:
      return {
        ...state,
        isFetching: true,
      };

    case actionTypes.FETCH_FEATURED_PAGE_DATA_ERROR:
      return {
        ...initialState,
        isFetching: false,
        success: false,
        error: action.payload,
      };

    case actionTypes.FETCH_FEATURED_PAGE_DATA_SUCCESS:
      return {
        ...state,
        isFetching: false,
        error: false,
        success: true,
      };

    case actionTypes.SET_MY_PLAYLISTS_FEATURED:
      return {
        ...state,
        playlistsFeatured: action.payload,
      };

    case actionTypes.SET_MY_RECOMMENDED_TRACKS:
      return {
        ...state,
        recommendedTracks: action.payload,
      };

    default:
      return state;
  }
};

export default reducer;
