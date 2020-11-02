import {
  SET_DISCOVER_WEEKLY,
  SET_PLAYLISTS,
  SET_TOKEN,
  SET_USER,
  REACT_APP_AVATAR_MENU_PROFILE,
  REACT_APP_AVATAR_MENU_ACCOUNT,
  REACT_APP_AVATAR_MENU_LOGOUT,
} from "./constants";

export const initialState = {
  user: null,
  playlists: [],
  playing: false,
  item: null,
  token: null,
  avatarMenu: [
    { title: "Account", url: REACT_APP_AVATAR_MENU_ACCOUNT },
    { title: "Profile", url: REACT_APP_AVATAR_MENU_PROFILE },
    { title: "Logout", url: REACT_APP_AVATAR_MENU_LOGOUT },
  ],
};

const reducer = (state, action) => {
  process.env.NODE_ENV === "development" && console.log(action);

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
