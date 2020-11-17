import { sidebarActionTypes as actionTypes } from "./types.js";

const initialState = {
  sidebarPlaylists: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
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
