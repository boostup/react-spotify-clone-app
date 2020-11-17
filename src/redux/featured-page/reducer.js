import { featuredPageActionTypes as actionTypes } from "./types.js";

const initialState = {
  playlistsFeatured: [],
  recommendedTracks: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
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
