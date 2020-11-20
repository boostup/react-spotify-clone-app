import { all, takeLatest, call, put } from "redux-saga/effects";
import { authActionTypes as actionTypes } from "./types";
import { spotifyAPI } from "libs/spotify";
import { setUser } from "./actions";
import {
  empty,
  storeUser,
  storeToken,
  storeTokenExpiry,
  getToken,
  getTokenExpiry,
  getUser,
} from "utils/localStorage";
import { getHashFromResponse } from "utils/http";
import { addMsToNow, isPast } from "utils/time";

/**
 * WORKER SAGAS
 */

function* rehydrateUser() {
  const user = yield call(getUser);
  yield put(setUser(user));
}

function* rehydrateSpotifyAccessToken(token) {
  yield spotifyAPI.setAccessToken(token);
}

function* emptyLocalStorage() {
  yield empty();
}

function* isTokenValid() {
  const tokenExpiry = yield call(getTokenExpiry);
  const _isPast = yield call(isPast, tokenExpiry);
  return !_isPast;
}

export function getMeAsync() {
  return spotifyAPI
    .getMe()
    .then((user) => user)
    .catch((err) => {
      return { error: err.response.message };
    });
}

function* storeAuthInLocalStorage(
  { token, expiry },
  { display_name, images, product }
) {
  yield call(storeUser, { display_name, images, product });
  yield call(storeToken, token);
  yield call(storeTokenExpiry, addMsToNow(expiry));
}

function* getTokenFromBrowserLocation() {
  const hash = yield getHashFromResponse(window.location.hash);
  /**
   * "/access_token" has a "/", why ? Because of HashRouter.
   * why HashRouter instead of typical BrowserRouter ?
   *
   * => https://github.com/boostup/react-spotify-clone-app/pull/2
   */
  return { token: hash["/access_token"], expiry: hash["expires_in"] };
}

function* initAuth() {
  const authObj = yield call(getTokenFromBrowserLocation);
  yield call(rehydrateSpotifyAccessToken, authObj.token);
  const user = yield call(getMeAsync);

  if (user.error) {
    return yield put({ type: actionTypes.AUTH_ERROR, payload: user.error });
  }

  yield call(storeAuthInLocalStorage, authObj, user);
  yield put({ type: actionTypes.AUTH_START });
}

/**
 * WATCHER SAGAS
 */

export function* spotifyAuthFlow() {
  yield takeLatest(actionTypes.SPOTIFY_AUTH_START, initAuth);
}

export function* authFlow() {
  yield takeLatest(
    actionTypes.AUTH_START,

    function* () {
      const isAllowed = yield call(isTokenValid);
      const token = yield call(getToken);
      if (isAllowed) {
        yield call(rehydrateSpotifyAccessToken, token);
        yield call(rehydrateUser);
        yield put({ type: actionTypes.AUTH_SUCCESS });
      } else {
        const errorMessage = token ? "Session Expired! Please login." : "";
        yield call(emptyLocalStorage);
        yield put({ type: actionTypes.AUTH_ERROR, payload: errorMessage });
      }
    }
  );
}

export function* authSagas() {
  yield all([
    //
    call(spotifyAuthFlow),
    call(authFlow),
  ]);
}
