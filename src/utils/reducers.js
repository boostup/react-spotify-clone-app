import {
  SET_DISCOVER_WEEKLY,
  SET_PLAYLISTS,
  SET_TOKEN,
  SET_USER,
} from "./constants";

export const initialState = {
  user: null,
  playlists: [],
  playing: false,
  item: null,
  token: null,
};

const reducer = (state, action) => {
  console.log(action);

  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        user: action.payload,
      };

    case SET_TOKEN:
      return {
        ...state,
        token: action.payload,
      };

    case SET_PLAYLISTS:
      return {
        ...state,
        playlists: action.payload,
      };

    case SET_DISCOVER_WEEKLY:
      return {
        ...state,
        discoverWeekly: action.payload,
      };

    default:
      return state;
  }
};

export default reducer;
