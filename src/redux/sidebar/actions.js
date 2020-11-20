import { sidebarActionTypes as actionTypes } from "./types";

export const fetchSidebarDataStart = () => ({
  type: actionTypes.FETCH_SIDEBAR_DATA_START,
});

export const setSidebarPlaylists = (playlists) => ({
  type: actionTypes.SET_SIDEBAR_PLAYLISTS,
  payload: playlists,
});
