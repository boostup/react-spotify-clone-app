import { all, takeLatest, call, put } from "redux-saga/effects";
import { sidebarActionTypes as actionTypes } from "./types";
import { spotifyAPI } from "libs/spotify";
import { setSidebarPlaylists } from "./actions";

/**
 * WORKER SAGAS
 */

function* getMyPlaylistsAync() {
  try {
    const playlists = yield spotifyAPI.getUserPlaylists();
    yield put(setSidebarPlaylists(playlists));
    return playlists;
  } catch (error) {
    throw error;
  }
}

export function* fetchSidebarDataStartAsync() {
  try {
    yield all([
      //
      call(getMyPlaylistsAync),
    ]);

    yield put({
      type: actionTypes.FETCH_SIDEBAR_DATA_SUCCESS,
    });
  } catch (error) {
    yield put({
      type: actionTypes.FETCH_SIDEBAR_DATA_ERROR,
      payload: error,
    });
  }
}

/**
 * WATCHER SAGAS
 */

export function* watchCanGetSidebarData() {
  yield takeLatest(
    actionTypes.FETCH_SIDEBAR_DATA_START,
    fetchSidebarDataStartAsync
  );
}

export function* sidebarSagas() {
  yield all([
    //
    call(watchCanGetSidebarData),
  ]);
}
