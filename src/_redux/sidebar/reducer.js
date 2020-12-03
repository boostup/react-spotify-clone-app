import { sidebarActionTypes as actionTypes } from "./types.js";

const initialState = {
  isFetching: false,
  error: null,
  success: null,
  sidebarPlaylists: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_SIDEBAR_DATA_START:
      return {
        ...state,
        isFetching: true,
      };

    case actionTypes.FETCH_SIDEBAR_DATA_ERROR:
      return {
        ...initialState,
        isFetching: false,
        success: false,
        error: action.payload,
      };

    case actionTypes.FETCH_SIDEBAR_DATA_SUCCESS:
      return {
        ...state,
        isFetching: false,
        error: false,
        success: true,
      };

    case actionTypes.SET_SIDEBAR_PLAYLISTS:
      return {
        ...state,
        sidebarPlaylists: action.payload,
      };

    default:
      return state;
  }
};

export default reducer;
