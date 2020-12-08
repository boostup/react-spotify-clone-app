import { all, takeLatest, call, put } from "redux-saga/effects";
import { sidebarActionTypes as actionTypes } from "./types";
import { setSidebarPlaylists } from "./actions";
import { getRefreshToken, getToken, getUser } from "utils/localStorage";

/**
 * WORKER SAGAS
 */

function* getMyPlaylistsAync() {
  try {
    const userId = getUser().id;
    const refreshToken = getRefreshToken();
    const accessToken = getToken();
    const { REACT_APP_DOMAIN, REACT_APP_GET_ALL_PLAYLISTS } = process.env;

    const url = `${REACT_APP_DOMAIN}${REACT_APP_GET_ALL_PLAYLISTS}?userId=${userId}&access_token=${accessToken}`;

    const data = yield call(fetch, url);
    const playlists = yield data.json();
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
