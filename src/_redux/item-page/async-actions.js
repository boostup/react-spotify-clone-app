import { all, takeLatest, call, put, select, spawn } from "redux-saga/effects";
import { itemPageActionTypes as actionTypes } from "./types";
import { eventsActionTypes } from "_redux/events/types";
import { spotifyAPI } from "libs/spotify";
import { setItem } from "./actions";
import { selectItem, selectIsItemPage, selectItemTracks } from "./selectors";
import { addTracks, getFnName, normalizePlaylistTracks } from "./helpers";

/**
 * WORKER SAGAS
 */

function* getMoreTracksAsync(_item, variant, _options) {
  try {
    const APIfnName = getFnName(variant, "Tracks");
    const data = yield spotifyAPI[APIfnName](_item.id, _options);
    const prevTracksObj = yield select(selectItemTracks);
    const prevTracks = yield prevTracksObj?.items || [];
    const newItem = {
      ..._item,
      tracks: {
        ...data,
        items: addTracks(variant, prevTracks, data.items),
      },
    };
    yield put(setItem(newItem));
    return newItem;
  } catch (error) {
    throw error;
  }
}

function* fetchMoreTracksStartAsync() {
  const isItemPage = yield select(selectIsItemPage);
  if (!isItemPage) return;
  const tracks = yield select(selectItemTracks);
  if (!tracks.next) return;
  const nextOffset = yield tracks.offset + tracks.limit;
  const item = yield select(selectItem);
  yield spawn(getMoreTracksAsync, item, item.type, {
    offset: nextOffset,
    limit: 100,
  });
}

function* getItemAsync(id, variant) {
  const APIfnName = getFnName(variant, "");
  try {
    const data = yield spotifyAPI[APIfnName](id);
    const item = {
      ...data,
      tracks: {
        ...data.tracks,
        items:
          variant === "playlist"
            ? normalizePlaylistTracks(data.tracks.items)
            : data.tracks.items,
      },
    };
    yield put(setItem(item));
    return item;
  } catch (error) {
    throw error;
  }
}

function* fetchItemPageDataStartAsync({ payload }) {
  try {
    const { id, variant } = payload;

    yield getItemAsync(id, variant);
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
    //
    actionTypes.FETCH_ITEM_PAGE_DATA_START,
    fetchItemPageDataStartAsync
  );
}

export function* watchLoadMore() {
  yield takeLatest(
    //
    eventsActionTypes.LOAD_MORE,
    fetchMoreTracksStartAsync
  );
}

export function* itemPageSagas() {
  yield all([
    //
    call(watchCanGetItemPageData),
    call(watchLoadMore),
  ]);
}
