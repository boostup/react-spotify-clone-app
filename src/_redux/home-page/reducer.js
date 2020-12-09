import { homePageActionTypes as actionTypes } from "./types.js";

const initialState = {
  isFetching: false,
  error: null,
  success: null,
  recentTracks: null,
  savedTracks: null,
  topTracks: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_HOME_PAGE_DATA_START:
      return {
        ...state,
        isFetching: true,
      };

    case actionTypes.FETCH_HOME_PAGE_DATA_ERROR:
      return {
        ...initialState,
        isFetching: false,
        success: false,
        error: action.payload,
      };

    case actionTypes.FETCH_HOME_PAGE_DATA_SUCCESS:
      return {
        ...state,
        isFetching: false,
        error: false,
        success: true,
        recentTracks: action.payload.recentTracks,
        savedTracks: action.payload.savedTracks,
        topTracks: action.payload.topTracks,
      };

    default:
      return state;
  }
};

export default reducer;
