import { userSavedTitlesActionTypes as actionTypes } from "./types.js";

const initialState = {
  isFetching: false,
  error: null,
  success: null,
  savedTitles: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_USER_SAVED_TITLES_START:
      return {
        ...state,
        isFetching: true,
      };

    case actionTypes.FETCH_USER_SAVED_TITLES_START_ERROR:
      return {
        ...initialState,
        isFetching: false,
        success: false,
        error: action.payload,
      };

    case actionTypes.FETCH_USER_SAVED_TITLES_START_SUCCESS:
      return {
        ...state,
        isFetching: false,
        error: false,
        success: true,
      };

    case actionTypes.SET_USER_SAVED_TITLES:
      return {
        ...state,
        savedTitles: action.payload,
      };

    default:
      return state;
  }
};

export default reducer;
