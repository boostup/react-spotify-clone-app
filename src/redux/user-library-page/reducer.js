import { userLibraryPageActionTypes as actionTypes } from "./types.js";

const initialState = {
  myPlaylists: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_MY_PLAYLISTS:
      return {
        ...state,
        myPlaylists: action.payload,
      };

    default:
      return state;
  }
};

export default reducer;
