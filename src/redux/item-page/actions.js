import { itemPageActionTypes as actionTypes } from "./types";

export const setItem = (item) => ({
  type: actionTypes.SET_ITEM,
  payload: item,
});

export const toggleIsItemPage = (displayToggle) => ({
  type: actionTypes.SET_IS_ITEM_PAGE,
  payload: displayToggle,
});

export const setIsPlaylistFollower = (value) => ({
  type: actionTypes.SET_PLAYLIST_IS_FOLLOWER,
  payload: value,
});
