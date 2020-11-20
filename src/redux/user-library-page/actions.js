import { userLibraryPageActionTypes as actionTypes } from "./types";

export const fetchUserLibraryPageDataStart = () => ({
  type: actionTypes.FETCH_USER_LIBRARY_PAGE_DATA_START,
});

export const setMyPlaylists = (playlists) => ({
  type: actionTypes.SET_MY_PLAYLISTS,
  payload: playlists,
});
