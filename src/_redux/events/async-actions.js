import { all, takeLatest, call, put } from "redux-saga/effects";
import { spotifyAPI } from "libs/spotify";

import { toggleHeartFailure, toggleHeartSuccess } from "./actions";
import { eventsActionTypes as actionTypes } from "./types";

/**
 * WORKER SAGAS
 */

export function* toggleItemHeartStartAsync({ payload }) {
  try {
    //remove item from favorite playlists
    if (payload.status && payload.variant === "playlist")
      spotifyAPI.unfollowPlaylist(payload.itemId);

    //add item to favorite playlists
    if (!payload.status && payload.variant === "playlist")
      spotifyAPI.followPlaylist(payload.itemId);

    //remove item from saved albums
    if (payload.status && payload.variant === "album")
      spotifyAPI.removeFromMySavedAlbums([payload.itemId]);

    //add item to saved albums
    if (!payload.status && payload.variant === "album")
      spotifyAPI.addToMySavedAlbums([payload.itemId]);

    yield put(toggleHeartSuccess());
  } catch (error) {
    yield put(toggleHeartFailure());
  }
}

export function* toggleTrackHeartStartAsync({ payload }) {
  try {
    if (payload.status) {
      yield spotifyAPI.removeFromMySavedTracks({ ids: [payload.trackId] });
    } else {
      yield spotifyAPI.addToMySavedTracks({ ids: [payload.trackId] });
    }
    yield put(toggleHeartSuccess());
  } catch (error) {
    yield put(toggleHeartFailure());
  }
}

/**
 * WATCHER SAGAS
 */

export function* watchToggleItemHeart() {
  yield takeLatest(
    actionTypes.TOGGLE_ITEM_HEART_START,
    toggleItemHeartStartAsync
  );
}

export function* watchToggleTrackHeart() {
  yield takeLatest(
    actionTypes.TOGGLE_TRACK_HEART_START,
    toggleTrackHeartStartAsync
  );
}

export function* eventsSagas() {
  yield all([
    //
    call(watchToggleItemHeart),
    call(watchToggleTrackHeart),
  ]);
}
