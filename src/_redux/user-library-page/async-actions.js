import { all, takeLatest, call, put, select } from "redux-saga/effects";
import { userLibraryPageActionTypes as actionTypes } from "./types";
import { setMyPlaylists, setMySavedAlbums } from "./actions";
import { selectSidebarPlaylists } from "../sidebar/selectors";
import { getToken } from "utils/localStorage";
import { getMyPlaylistsAync } from "_redux/sidebar/async-actions";

/**
 * WORKER SAGAS
 */

function* getUserSavedAlbums() {
  try {
    const { REACT_APP_GET_ALL_SAVED_ALBUMS } = process.env;
    const url = `${REACT_APP_GET_ALL_SAVED_ALBUMS}?access_token=${getToken()}`;
    const data = yield call(fetch, url);
    const albums = yield data.json();
    yield put(setMySavedAlbums(albums));
  } catch (error) {
    throw error;
  }
}

export function* getUserPlaylists() {
  try {
    const accessToken = getToken();
    const { REACT_APP_GET_ALL_PLAYLISTS } = process.env;

    const url = `${REACT_APP_GET_ALL_PLAYLISTS}?access_token=${accessToken}`;

    const data = yield call(fetch, url);
    const playlists = yield data.json();
    yield put(setMyPlaylists(playlists));
    return playlists;
  } catch (error) {
    throw error;
  }
}

function* fetchUserLibraryPageDataStart() {
  try {
    yield all([
      //
      call(getUserPlaylists),
      call(getUserSavedAlbums),
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
    fetchUserLibraryPageDataStart
  );
}

export function* userLibraryPageSagas() {
  yield all([
    //
    call(watchCanGetUserLibraryPageData),
  ]);
}
