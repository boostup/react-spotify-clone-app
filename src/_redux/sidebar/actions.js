import { sidebarActionTypes as actionTypes } from "./types";

export const fetchSidebarDataStart = () => ({
  type: actionTypes.FETCH_SIDEBAR_DATA_START,
});

export const setSidebarPlaylists = (playlists) => ({
  type: actionTypes.SET_SIDEBAR_PLAYLISTS,
  payload: playlists,
});

export const toggleSidebarVisibility = (value) => ({
  type: actionTypes.TOGGLE_SIDEBAR_VISIBILITY,
  payload: value,
});
