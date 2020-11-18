import { homePageActionTypes as actionTypes } from "./types.js";

const initialState = {
  isFetching: false,
  error: null,
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

    case actionTypes.FETCH_HOME_PAGE_DATA_SUCCESS:
      return {
        ...state,
        isFetching: false,
        error: null,
      };

    case actionTypes.FETCH_HOME_PAGE_DATA_ERROR:
      return {
        ...state,
        isFetching: false,
        error: action.payload,
      };

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
