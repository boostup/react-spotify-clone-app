import { all, takeLatest, call, put } from "redux-saga/effects";
import { userSavedTitlesActionTypes as actionTypes } from "./types";
import { setMySavedTitles } from "./actions";
import { getToken } from "utils/localStorage";

/**
 * WORKER SAGAS
 */

function* getUserSavedTitles() {
  try {
    const { REACT_APP_GET_SAVED_TITLES_PAGE_DATA } = process.env;
    const url = `${REACT_APP_GET_SAVED_TITLES_PAGE_DATA}?access_token=${getToken()}`;
    const data = yield call(fetch, url);
    const tracks = yield data.json();

    yield put(setMySavedTitles(tracks));
  } catch (error) {
    throw error;
  }
}

function* fetchSavedTitlesPageDataStart() {
  try {
    yield all([
      //
      call(getUserSavedTitles),
    ]);
    yield put({
      type: actionTypes.FETCH_USER_SAVED_TITLES_START_SUCCESS,
    });
  } catch (error) {
    yield put({
      type: actionTypes.FETCH_USER_SAVED_TITLES_START_ERROR,
      payload: error,
    });
  }
}

/**
 * WATCHER SAGAS
 */

export function* watchCanGetUserSavedTitlesPageData() {
  yield takeLatest(
    actionTypes.FETCH_USER_SAVED_TITLES_START,
    fetchSavedTitlesPageDataStart
  );
}

export function* userSavedTitlesPageSagas() {
  yield all([
    //
    call(watchCanGetUserSavedTitlesPageData),
  ]);
}
