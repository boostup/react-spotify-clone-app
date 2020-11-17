import { userLibraryPageActionTypes as actionTypes } from "./types";

export const setMyPlaylists = (playlists) => ({
  type: actionTypes.SET_MY_PLAYLISTS,
  payload: playlists,
});
