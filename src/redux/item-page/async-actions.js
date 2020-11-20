import { all, takeLatest, call, put } from "redux-saga/effects";
import { itemPageActionTypes as actionTypes } from "./types";
import { spotifyAPI } from "libs/spotify";
import { setItem } from "./actions";

/**
 * WORKER SAGAS
 */

function* getPlaylistAsync(id) {
  try {
    const data = yield spotifyAPI.getPlaylist(id);
    const playlistItem = {
      ...data,
      items: data.tracks.items.map((i) => i.track),
    };
    yield put(setItem(playlistItem));
    return playlistItem;
  } catch (error) {
    throw error;
  }
}

function* getAlbumAsync(id) {
  try {
    const data = yield spotifyAPI.getAlbum(id);
    const albumItem = {
      ...data,
      items: data.tracks.items.map((i) => i),
    };
    yield put(setItem(albumItem));
    return albumItem;
  } catch (error) {
    throw error;
  }
}

// export function isPlaylistFollowedByUser({ playlistId, userId }, dispatch) {
//   spotifyAPI
//     .areFollowingPlaylist(playlistId, [userId])
//     .then((data) => {
//       return dispatch(setIsPlaylistFollower(data[0]));
//     })
// }

// export function togglefollowPlaylist({ id, follow }) {
//   follow
//     ? //
//       spotifyAPI.areFollowingPlaylist.followPlaylist(id)
//     : spotifyAPI.unfollowPlaylist(id);
// }

function* fetchItemPageDataStartAsync({ payload }) {
  const fetchItem = yield (type) => {
    const get = {
      album: getAlbumAsync,
      playlist: getPlaylistAsync,
    };
    return get[type];
  };

  try {
    const { id, variant } = payload;
    yield fetchItem(variant)(id);
    yield put({
      type: actionTypes.FETCH_ITEM_PAGE_DATA_SUCCESS,
    });
  } catch (error) {
    yield put({ type: actionTypes.FETCH_ITEM_PAGE_DATA_ERROR, payload: error });
  }
}

/**
 * WATCHER SAGAS
 */

export function* watchCanGetItemPageData() {
  yield takeLatest(
    actionTypes.FETCH_ITEM_PAGE_DATA_START,
    fetchItemPageDataStartAsync
  );
}

export function* itemPageSagas() {
  yield all([
    //
    call(watchCanGetItemPageData),
  ]);
}
