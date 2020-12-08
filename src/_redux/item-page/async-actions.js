import { all, takeLatest, call, put } from "redux-saga/effects";
import { itemPageActionTypes as actionTypes } from "./types";
import { setItem } from "./actions";
import { getToken, getUser } from "utils/localStorage";

/**
 * WORKER SAGAS
 */

function* getItemAsync(id, variant) {
  try {
    const userId = getUser().id;
    const accessToken = getToken();
    const { REACT_APP_DOMAIN, REACT_APP_GET_ITEM } = process.env;

    const url = `${REACT_APP_DOMAIN}${REACT_APP_GET_ITEM}?userId=${userId}&variant=${variant}&itemId=${id}&access_token=${accessToken}`;

    const data = yield call(fetch, url);
    const item = yield data.json();
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

export function* itemPageSagas() {
  yield all([
    //
    call(watchCanGetItemPageData),
  ]);
}
