import { all, takeLatest, call, put } from "redux-saga/effects";
import { searchPageActionTypes as actionTypes } from "./types";
import { spotifyAPI } from "../../libs/spotify";
import { setSearchResults } from "./actions";

/**
 * WORKER SAGAS
 */

function* searchSpotifyAsync(searchTerm) {
  try {
    const data = yield spotifyAPI.search(searchTerm, [
      "artist",
      "album",
      "playlist",
    ]);
    yield put(setSearchResults(data));
    return data;
  } catch (error) {
    throw error;
  }
}

function* fetchSearchPageDataStartAsync({ searchTerm }) {
  try {
    yield all([
      //
      call(searchSpotifyAsync, searchTerm),
    ]);

    yield put({
      type: actionTypes.FETCH_SEARCH_PAGE_DATA_SUCCESS,
    });
  } catch (error) {
    yield put({
      type: actionTypes.FETCH_SEARCH_PAGE_DATA_ERROR,
      payload: error,
    });
  }
}

/**
 * WATCHER SAGAS
 */

export function* watchCanGetSearchPageData() {
  yield takeLatest(
    actionTypes.FETCH_SEARCH_PAGE_DATA_START,
    fetchSearchPageDataStartAsync
  );
}

export function* searchPageSagas() {
  yield all([
    //
    call(watchCanGetSearchPageData),
  ]);
}
