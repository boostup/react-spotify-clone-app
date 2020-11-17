import { sidebarActionTypes as actionTypes } from "./types";

export const setSidebarPlaylists = (playlists) => ({
  type: actionTypes.SET_SIDEBAR_PLAYLISTS,
  payload: playlists,
});
