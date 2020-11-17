import { featuredPageActionTypes as actionTypes } from "./types";

export const setMyRecommendedTracks = (tracks) => ({
  type: actionTypes.SET_MY_RECOMMENDED_TRACKS,
  payload: tracks,
});

export const setMyPlaylistsFeatured = (playlists) => ({
  type: actionTypes.SET_MY_PLAYLISTS_FEATURED,
  payload: playlists,
});
