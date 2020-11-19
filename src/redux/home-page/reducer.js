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
        ...initialState,
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
