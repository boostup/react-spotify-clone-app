import { all, takeLatest, call, put } from "redux-saga/effects";
import { homePageActionTypes as actionTypes } from "./types";
import { spotifyAPI } from "libs/spotify";
import { setMySavedTracks, setRecentTracks, setTopTracks } from "./actions";
import { delay } from "utils/time";
import {
  SPLASH_SCREEN_DURATION,
  canDisplaySplashScreen,
} from "components/SpotifyAnimated/useSplashScreen";
import { getToken } from "utils/localStorage";

/**
 * WORKER SAGAS
 */
function* getHomePageDataAsync() {
  try {
    const { REACT_APP_GET_HOME_PAGE_DATA } = process.env;
    const url = `${REACT_APP_GET_HOME_PAGE_DATA}?access_token=${getToken()}`;
    const data = yield call(fetch, url);
    const item = yield data.json();
    return item;
  } catch (error) {
    throw error;
  }
}

function* fetchHomePageDataStartAsync() {
  try {
    if (canDisplaySplashScreen()) {
      yield call(delay, SPLASH_SCREEN_DURATION);
    }

    const homeData = yield call(getHomePageDataAsync);

    yield put({
      type: actionTypes.FETCH_HOME_PAGE_DATA_SUCCESS,
      payload: homeData,
    });
  } catch (error) {
    yield put({ type: actionTypes.FETCH_HOME_PAGE_DATA_ERROR, payload: error });
  }
}

/**
 * WATCHER SAGAS
 */

export function* watchCanGetHomePageData() {
  yield takeLatest(
    actionTypes.FETCH_HOME_PAGE_DATA_START,
    fetchHomePageDataStartAsync
  );
}

export function* homePageSagas() {
  yield all([
    //
    call(watchCanGetHomePageData),
  ]);
}
