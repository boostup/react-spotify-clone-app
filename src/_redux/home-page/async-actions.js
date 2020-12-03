import { all, takeLatest, call, put } from "redux-saga/effects";
import { homePageActionTypes as actionTypes } from "./types";
import { spotifyAPI } from "libs/spotify";
import { setMySavedTracks, setRecentTracks, setTopTracks } from "./actions";
import { delay } from "utils/time";
import {
  SPLASH_SCREEN_DURATION,
  canDisplaySplashScreen,
} from "components/SpotifyAnimated/useSplashScreen";

/**
 * WORKER SAGAS
 */

function* getMyTopTracksAsync() {
  try {
    const data = yield spotifyAPI.getMyTopTracks({ limit: 5 });
    const tracks = data.items;
    yield put(setTopTracks(tracks));
    return tracks;
  } catch (error) {
    throw error;
  }
}

function* getMySavedTracksAsync() {
  try {
    const data = yield spotifyAPI.getMySavedTracks({ limit: 5 });
    const tracks = data.items.map((item) => item.track);
    yield put(setMySavedTracks(tracks));
    return tracks;
  } catch (error) {
    throw error;
  }
}

function* getMyRecentTracksAsync() {
  try {
    const data = yield spotifyAPI.getMyRecentlyPlayedTracks({ limit: 5 });
    const tracks = data.items.map((item) => item.track);
    yield put(setRecentTracks(tracks));
    return tracks;
  } catch (error) {
    throw error;
  }
}

//Latest 5 Saved Tracks are displayed in the home page, this is why I placed this function here ;)
export function addToMySavedTracks(trackId) {
  spotifyAPI.addToMySavedTracks({ ids: [trackId] });
}

function* fetchHomePageDataStartAsync() {
  try {
    yield all([
      //
      call(getMySavedTracksAsync),
      call(getMyTopTracksAsync),
      call(getMyRecentTracksAsync),
    ]);

    if (canDisplaySplashScreen()) {
      yield call(delay, SPLASH_SCREEN_DURATION);
    }

    yield put({
      type: actionTypes.FETCH_HOME_PAGE_DATA_SUCCESS,
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
