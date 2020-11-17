import { authActionTypes as actionTypes } from "./types";

export const setToken = (token) => ({
  type: actionTypes.SET_TOKEN,
  payload: token,
});

export const setTokenExpiry = (tokenExpiry) => ({
  type: actionTypes.SET_TOKEN_EXPIRY,
  payload: tokenExpiry,
});

export const setUser = (user) => ({
  type: actionTypes.SET_USER,
  payload: user,
});
