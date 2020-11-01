import { SET_PLAYLISTS, SET_TOKEN, SET_USER } from "./constants";

export const initialState = {
  user: null,
  playlists: [],
  playing: false,
  item: null,
  token: null,
};

//This is so I don't have to log into Spotify everytime the app refreshes while I develop it
if (process.env.NODE_ENV === "development") {
  initialState.token =
    "BQBXxQvLsGeG0QyfB2yy717QBInBy_3fHCf3SrbIsc2bdearZqGKPdB_fuPOzMfVBdcFPZoHWOAAqn6p2YYGpy_8OcxCsoHBRed9gNH-o8cdY2GLtwyVA4uhkgG5Dy4fTSGvqMjtsrC28G0mpQjiMS1d";
}

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

    default:
      return state;
  }
};

export default reducer;
