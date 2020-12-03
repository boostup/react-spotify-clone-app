import { all, takeLatest, call, put } from "redux-saga/effects";
import { footerActionTypes as actionTypes } from "./types";
import { spotifyAPI } from "libs/spotify";
import {
  caughtRemoteControlApiError,
  setCurrentPlaybackState,
} from "./actions";

export function* fetchCurrentPlaybackStateAsync() {
  try {
    const res = yield spotifyAPI.getMyCurrentPlaybackState();
    if (res === "") return; //No tracks currently playing
    yield put(setCurrentPlaybackState(res));
    return res;
  } catch (_error) {
    const { error } = yield JSON.parse(_error.response);
    const { status, message } = error;
    put(caughtRemoteControlApiError({ status, message }));
  }
}

/**
 * WATCHER SAGAS
 */

export function* watchCanGetFooterData() {
  yield takeLatest(
    actionTypes.FETCH_CURRENT_PLAYBACK_STATE_START,
    fetchCurrentPlaybackStateAsync
  );
}

export function* footerSagas() {
  yield all([
    //
    call(watchCanGetFooterData),
  ]);
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
export async function playItem(uri, dispatch) {
  try {
    await spotifyAPI.play({
      context_uri: uri,
    });
  } catch (_error) {
    await createApiError(_error, dispatch);
  }
}

/**
 * Only plays tracks
 * @param {string} uri
 */

export async function playTrack(uri, dispatch) {
  try {
    await spotifyAPI.play({
      uris: [uri],
    });
  } catch (_error) {
    await createApiError(_error, dispatch);
  }
}

export async function toggleRepeat(value, dispatch) {
  try {
    await spotifyAPI.setRepeat(value);
  } catch (_error) {
    await createApiError(_error, dispatch);
  }
}

export async function toggleShuffle(value, dispatch) {
  try {
    await spotifyAPI.setShuffle(value);
  } catch (_error) {
    await createApiError(_error, dispatch);
  }
}

export async function skipToPrevious(dispatch) {
  try {
    await spotifyAPI.skipToPrevious();
  } catch (_error) {
    await createApiError(_error, dispatch);
  }
}

export async function skipToNext(dispatch) {
  try {
    await spotifyAPI.skipToNext();
  } catch (_error) {
    await createApiError(_error, dispatch);
  }
}

export async function togglePlayPause(value, dispatch) {
  try {
    if (value) await spotifyAPI.play();
    else await spotifyAPI.pause();
  } catch (_error) {
    await createApiError(_error, dispatch);
  }
}

export async function setVolume(value, dispatch) {
  try {
    await spotifyAPI.setVolume(value);
  } catch (_error) {
    await createApiError(_error, dispatch);
  }
}

export async function addToQueue(trackURI, dispatch) {
  try {
    await spotifyAPI.queue(trackURI);
  } catch (_error) {
    await createApiError(_error, dispatch);
  }
}

async function createApiError(_error, dispatch) {
  const { error } = await JSON.parse(_error.response);
  const { status, message } = error;
  dispatch(caughtRemoteControlApiError({ status, message }));
}
