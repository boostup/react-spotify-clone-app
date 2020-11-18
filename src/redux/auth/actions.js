import { authActionTypes as actionTypes } from "./types";

export const startAuth = () => ({
  type: actionTypes.AUTH_START,
});

export const startSpotifyAuth = () => ({
  type: actionTypes.SPOTIFY_AUTH_START,
});

export const setUser = (user) => ({
  type: actionTypes.SET_USER,
  payload: user,
});
