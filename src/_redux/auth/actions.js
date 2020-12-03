import { authActionTypes as actionTypes } from "./types";

export const authStart = () => ({
  type: actionTypes.AUTH_START,
});

export const authWithStoredTokenStart = () => ({
  type: actionTypes.AUTH_START_WITH_STORED_TOKEN,
});

export const authWithRedirectionTokenStart = () => ({
  type: actionTypes.AUTH_START_WITH_TOKEN_FROM_REDIRECTION,
});

export const refreshAccessTokenStart = () => ({
  type: actionTypes.REFRESH_ACCESS_TOKEN_START,
});

export const setUser = (user) => ({
  type: actionTypes.SET_USER,
  payload: user,
});

export const logout = () => ({
  type: actionTypes.AUTH_LOGOUT_START,
});
