import { actionTypes } from "./actionTypes";
import { spotifyAPI, hydrateSpotifyApi } from "../libs/spotify";

/**
 *
 * AUTH ACTION CREATORS
 */

export const setUser = (user) => ({
  type: actionTypes.SET_USER,
  payload: user,
});

export const setToken = (token) => ({
  type: actionTypes.SET_TOKEN,
  payload: token,
});

export const setTokenExpiry = (tokenExpiry) => ({
  type: actionTypes.SET_TOKEN_EXPIRY,
  payload: tokenExpiry,
});

/**
 *
 * USER PLAYLISTS ACTION CREATORS
 */

export const setPlaylists = (playlists) => ({
  type: actionTypes.SET_PLAYLISTS,
  payload: playlists,
});

export const setPlaylist = (playlist) => ({
  type: actionTypes.SET_PLAYLIST,
  payload: playlist,
});

/**
 *
 * SPOTIFY REMOTE CONTROL ACTION CREATORS
 */

export function getMyCurrentPlaybackState(dispatch) {
  spotifyAPI
    .getMyCurrentPlaybackState()
    .then((res) => {
      if (res === "") return; //No tracks currently playing
      dispatch({
        type: actionTypes.SET_CURRENT_PLAYBACK_STATE,
        payload: res,
      });
    })
    .catch((error) => {
      console.log(error);
      hydrateSpotifyApi(error, dispatch);
    });
}

export function playPlaylist(dispatch, id) {
  spotifyAPI
    .play({
      context_uri: `spotify:playlist:${id}`,
    })
    .then(() => getMyCurrentPlaybackState(dispatch));
}

export function playTrack(dispatch, id) {
  spotifyAPI
    .play({
      uris: [`spotify:track:${id}`],
    })
    .then(() => getMyCurrentPlaybackState(dispatch));
}

/**
 *
 * SEARCH ACTION CREATORS
 */

export const toggleDisplaySearchBar = (displayToggle) => ({
  type: actionTypes.SET_SEARCH_BAR_DISPLAY,
  payload: displayToggle,
});

export const setSearchResults = (results) => ({
  type: actionTypes.SET_SEARCH_RESULTS,
  payload: results,
});

export const setSearchFilter = (searchFilter) => ({
  type: actionTypes.SET_SEARCH_FILTER,
  payload: searchFilter,
});
