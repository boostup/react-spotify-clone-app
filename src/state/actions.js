import { actionTypes } from "./actionTypes";
import { spotifyAPI, hydrateSpotifyApi } from "../libs/spotify";

/**
 *
 * AUTH ACTION CREATORS
 */

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
 * USER ACTION CREATORS & ASYNC ACTIONS
 */

export const setUser = (user) => ({
  type: actionTypes.SET_USER,
  payload: user,
});

export function getMeAsync(dispatch) {
  return spotifyAPI.getMe().then((user) => {
    dispatch(setUser(user));
    return user;
  });
}

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
 * USER PLAYLISTS ASYNC ACTIONS
 */

export function getPlaylistAsync(id, dispatch) {
  spotifyAPI
    .getPlaylist(id || "37i9dQZEVXcDGlrEgKnU30")
    //
    .then((playlist) => dispatch(setPlaylist(playlist)))
    .catch((error) => {
      hydrateSpotifyApi(error, dispatch);
    });
}

export function getPlaylistsAync(dispatch) {
  spotifyAPI
    .getUserPlaylists()
    .then((playlists) => {
      dispatch(setPlaylists(playlists));
    })
    .catch((error) => {
      hydrateSpotifyApi(error, dispatch);
    });
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

/**
 *
 * Shared/Cloud Playback state ASYNC function
 */

export function getMyCurrentPlaybackStateAsync(dispatch) {
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

/**
 *
 * SPOTIFY REMOTE CONTROL ASYNC ACTIONS
 *
 * All remote control actions send data to the `Cloud Player` through the Spotify Playback SDK.
 * By doing so, the playback state is therefore changed.
 * Hence, to make sure that the app is synchronized at all times, the app registers a listener to get notified of any such changes.
 * This is done in ` useSpotifyWebPlaybackSDK` => `player.addListener("player_state_changed"...`
 * This listener is registered with the `getMyCurrentPlaybackStateAsync` function above.
 *
 */

export function playPlaylist(id) {
  spotifyAPI.play({
    context_uri: `spotify:playlist:${id}`,
  });
}

export function playTrack(id) {
  spotifyAPI.play({
    uris: [`spotify:track:${id}`],
  });
}

export function toggleRepeat(value) {
  spotifyAPI.setRepeat(value);
}

export function toggleShuffle(value) {
  spotifyAPI.setShuffle(value);
}

export function skipToPrevious() {
  spotifyAPI.skipToPrevious();
}

export function skipToNext() {
  spotifyAPI.skipToNext();
}

export function togglePlayPause(value) {
  if (value) spotifyAPI.play();
  else spotifyAPI.pause();
}

export function setVolume(value) {
  spotifyAPI.setVolume(value);
}
