import { userLibraryPageActionTypes as actionTypes } from "./types.js";

const initialState = {
  isFetching: false,
  error: null,
  success: null,
  myPlaylists: [],
  myAlbums: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_USER_LIBRARY_PAGE_DATA_START:
      return {
        ...state,
        isFetching: true,
      };

    case actionTypes.FETCH_USER_LIBRARY_PAGE_DATA_ERROR:
      return {
        ...initialState,
        isFetching: false,
        success: false,
        error: action.payload,
      };

    case actionTypes.FETCH_USER_LIBRARY_PAGE_DATA_SUCCESS:
      return {
        ...state,
        isFetching: false,
        error: false,
        success: true,
      };

    case actionTypes.SET_MY_PLAYLISTS:
      return {
        ...state,
        myPlaylists: action.payload,
      };

    case actionTypes.SET_MY_SAVED_ALBUMS:
      return {
        ...state,
        myAlbums: action.payload,
      };

    default:
      return state;
  }
};

export default reducer;
