import { all, takeLatest, call, put, select } from "redux-saga/effects";
import { userLibraryPageActionTypes as actionTypes } from "./types";
import { setMyPlaylists } from "./actions";
import { selectSidebarPlaylists } from "../sidebar/selectors";

/**
 * WORKER SAGAS
 */

function* fetchUserLibraryPageDataStart() {
  try {
    const playlists = yield select(selectSidebarPlaylists);
    yield put(setMyPlaylists(playlists));

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
