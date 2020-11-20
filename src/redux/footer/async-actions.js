import { all, takeLatest, call, put } from "redux-saga/effects";
import { footerActionTypes as actionTypes } from "./types";
import { spotifyAPI } from "libs/spotify";
import { setCurrentPlaybackState } from "./actions";

export function* fetchMyCurrentPlaybackStateAsync() {
  try {
    const res = yield spotifyAPI.getMyCurrentPlaybackState();
    if (res === "") return; //No tracks currently playing
    yield put(setCurrentPlaybackState(res));
    return res;
  } catch (error) {
    throw error;
  }
}

/**
 * WATCHER SAGAS
 */

export function* watchCanGetFooterData() {
  yield takeLatest(
    actionTypes.FETCH_CURRENT_PLAYBACK_STATE,
    fetchMyCurrentPlaybackStateAsync
  );
}

export function* footerSagas() {
  yield all([
    //
    call(watchCanGetFooterData),
  ]);
}

export function addToQueue(trackURI) {
  spotifyAPI.queue(trackURI);
}

/**
 *
 * SPOTIFY REMOTE CONTROL ASYNC ACTIONS
 *
 * All remote control actions send data to the `Cloud Player` through the Spotify Playback SDK.
 * By doing so, the playback state is therefore changed.
 * Hence, to make sure that the app is synchronized at all times, the app registers a listener to get notified of any such changes.
 * This is done in `libs/spotify/useSpotifyWebPlaybackSDK.js` file => `player.addListener("player_state_changed"...`
 * This listener is registered with the `fetchMyCurrentPlaybackState` action creator function in the `./actions.js` file
 *
 */

/**
 * Plays albums and playlists
 *
 * @param {sting} uri
 */
export function playItem(uri) {
  spotifyAPI.play({
    context_uri: uri,
  });
}

/**
 * Only plays tracks
 * @param {string} uri
 */

export function playTrack(uri) {
  spotifyAPI.play({
    uris: [uri],
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
