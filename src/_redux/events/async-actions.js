import { all, takeLatest, call, put } from "redux-saga/effects";
import { spotifyAPI } from "libs/spotify";

import { toggleTrackHeartSuccess } from "./actions";
import { eventsActionTypes as actionTypes } from "./types";

/**
 * WORKER SAGAS
 */

export function* toggleTrackHeartStartAsync({ payload }) {
  if (payload.status) {
    yield spotifyAPI.removeFromMySavedTracks({ ids: [payload.trackId] });
  } else {
    yield spotifyAPI.addToMySavedTracks({ ids: [payload.trackId] });
  }
  yield put(toggleTrackHeartSuccess());
}

/**
 * WATCHER SAGAS
 */

export function* watchToggleTrackHeart() {
  yield takeLatest(
    actionTypes.TOGGLE_TRACK_HEART_START,
    toggleTrackHeartStartAsync
  );
}

export function* eventsSagas() {
  yield all([
    //
    call(watchToggleTrackHeart),
  ]);
}
