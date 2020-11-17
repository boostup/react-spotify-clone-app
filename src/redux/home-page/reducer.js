import { homePageActionTypes as actionTypes } from "./types.js";

const initialState = {
  recentTracks: [],
  savedTracks: [],
  topTracks: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_MY_RECENT_TRACKS:
      return {
        ...state,
        recentTracks: action.payload,
      };

    case actionTypes.SET_MY_SAVED_TRACKS:
      return {
        ...state,
        savedTracks: action.payload,
      };

    case actionTypes.SET_MY_TOP_TRACKS:
      return {
        ...state,
        topTracks: action.payload,
      };

    default:
      return state;
  }
};

export default reducer;
