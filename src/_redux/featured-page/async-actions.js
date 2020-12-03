import { all, takeLatest, call, put } from "redux-saga/effects";
import { featuredPageActionTypes as actionTypes } from "./types";
import { spotifyAPI } from "libs/spotify";
import { setMyPlaylistsFeatured, setMyRecommendedTracks } from "./actions";

/**
 * WORKER SAGAS
 */

export function* getRecommendationsAsync(trackId) {
  try {
    const data = yield spotifyAPI.getRecommendations({
      seed_tracks: trackId,
      limit: 20,
    });
    const tracks = data.tracks;
    yield put(setMyRecommendedTracks(tracks));
    return tracks;
  } catch (error) {
    throw error;
  }
}

export function* getMyPlaylistsFeaturedAsync() {
  try {
    const data = yield spotifyAPI.getFeaturedPlaylists({
      limit: 5,
      locale: navigator.language || "en-US",
    });
    yield put(setMyPlaylistsFeatured(data));
    return data;
  } catch (error) {
    throw error;
  }
}

function* fetchFeaturedPageDataStartAsync({ trackId }) {
  try {
    yield all([
      //
      call(getRecommendationsAsync, trackId),
      call(getMyPlaylistsFeaturedAsync),
    ]);

    yield put({
      type: actionTypes.FETCH_FEATURED_PAGE_DATA_SUCCESS,
    });
  } catch (error) {
    yield put({
      type: actionTypes.FETCH_FEATURED_PAGE_DATA_ERROR,
      payload: error,
    });
  }
}

/**
 * WATCHER SAGAS
 */

export function* watchCanGetFeatuedPageData() {
  yield takeLatest(
    actionTypes.FETCH_FEATURED_PAGE_DATA_START,
    fetchFeaturedPageDataStartAsync
  );
}

export function* featuredPageSagas() {
  yield all([
    //
    call(watchCanGetFeatuedPageData),
  ]);
}
