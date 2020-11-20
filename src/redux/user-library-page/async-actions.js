import { all, takeLatest, call, put } from "redux-saga/effects";
import { userLibraryPageActionTypes as actionTypes } from "./types";
import { spotifyAPI } from "libs/spotify";
import { setMyPlaylists } from "./actions";

/**
 * WORKER SAGAS
 */

function* getMyPlaylistsAync() {
  try {
    const playlists = yield spotifyAPI.getUserPlaylists();
    yield put(setMyPlaylists(playlists));
    return playlists;
  } catch (error) {
    throw error;
  }
}

function* fetchUserLibraryPageDataStartAsync() {
  try {
    yield all([
      //
      call(getMyPlaylistsAync),
    ]);

    yield put({
      type: actionTypes.FETCH_USER_LIBRARY_PAGE_DATA_SUCCESS,
    });
  } catch (error) {
    yield put({
      type: actionTypes.FETCH_USER_LIBRARY_PAGE_DATA_ERROR,
      payload: error,
    });
  }
}

/**
 * WATCHER SAGAS
 */

export function* watchCanGetUserLibraryPageData() {
  yield takeLatest(
    actionTypes.FETCH_USER_LIBRARY_PAGE_DATA_START,
    fetchUserLibraryPageDataStartAsync
  );
}

export function* userLibraryPageSagas() {
  yield all([
    //
    call(watchCanGetUserLibraryPageData),
  ]);
}
