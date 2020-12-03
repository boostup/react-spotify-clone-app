import { all, takeLatest, call, put } from "redux-saga/effects";
import { authActionTypes as actionTypes } from "./types";
import {
  spotifyAPI,
  REFRESH_ACCESS_TOKEN_BACKEND_LOCATION,
} from "libs/spotify";
import {
  authWithRedirectionTokenStart,
  authWithStoredTokenStart,
  refreshAccessTokenStart,
  setUser,
} from "./actions";
import {
  empty,
  storeUser,
  storeToken,
  storeTokenExpiry,
  storeRefreshToken,
  getToken,
  getTokenExpiry,
  getRefreshToken,
  getUser,
} from "utils/localStorage";
import { getHashFromResponse } from "utils/http";
import { addSecondsToNow, isPast } from "utils/time";

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
  { token, expiry, refreshToken },
  { display_name, images, product }
) {
  yield display_name && call(storeUser, { display_name, images, product });
  yield call(storeToken, token);
  yield call(storeTokenExpiry, addSecondsToNow(expiry));
  yield call(storeRefreshToken, refreshToken);
}

function* getTokenFromBrowserLocation() {
  const hash = yield getHashFromResponse(window.location.hash);
  /**
   * "/spotify_redirect?access_token" has a "/", why ? Because of HashRouter.
   * why HashRouter instead of typical BrowserRouter ?
   *
   * => https://github.com/boostup/react-spotify-clone-app/pull/2
   */
  return {
    token: hash["/spotify_redirect?access_token"],
    expiry: hash["expires_in"],
    refreshToken: hash["refresh_token"],
  };
}

function* authWithRedirectionToken() {
  const authObj = yield call(getTokenFromBrowserLocation);
  yield call(rehydrateSpotifyAccessToken, authObj.token);
  const user = yield call(getMeAsync);

  if (user.error) {
    return yield put({ type: actionTypes.AUTH_ERROR, payload: user.error });
  }

  yield call(storeAuthInLocalStorage, authObj, user);
  yield put(authWithStoredTokenStart());
}

/**
 * WATCHER SAGAS
 */

export function* authFlow() {
  /*
   *  Overview of the Auth flow
   *  is there a token in LocalStorage ?
   *    => attempt auth'ing user automagically with the stored token => authWithStoredToken
   *      if token valid => allow user to the app private routes
   *      if not => refreshToken through the SpotifLy backend
   *  if no token is found in LocalStorage => user manual login required => authWithBrowserLocation
   *
   */

  yield takeLatest(actionTypes.AUTH_START, function* () {
    if (getToken()) {
      yield put(authWithStoredTokenStart());
    } else {
      yield put(authWithRedirectionTokenStart());
    }
  });
}

export function* authWithRedirectionTokenFlow() {
  yield takeLatest(
    actionTypes.AUTH_START_WITH_TOKEN_FROM_REDIRECTION,
    authWithRedirectionToken
  );
}

export function* authWithStoredTokenFlow() {
  yield takeLatest(
    actionTypes.AUTH_START_WITH_STORED_TOKEN,

    function* () {
      const isValid = yield call(isTokenValid);
      const token = yield call(getToken);
      if (isValid) {
        yield call(rehydrateSpotifyAccessToken, token);
        yield call(rehydrateUser);
        yield put({ type: actionTypes.AUTH_SUCCESS });
      } else {
        yield put(refreshAccessTokenStart());
      }
    }
  );
}

export function* refreshAccessTokenFlow() {
  yield takeLatest(actionTypes.REFRESH_ACCESS_TOKEN_START, function* () {
    try {
      const refreshToken = getRefreshToken();
      const result = yield fetch(
        `${REFRESH_ACCESS_TOKEN_BACKEND_LOCATION}?access_token=${getToken()}&refresh_token=${refreshToken}`
      );
      const { access_token, expires_in } = yield result.json();
      yield call(
        storeAuthInLocalStorage,
        {
          token: access_token,
          expiry: expires_in,
          refreshToken,
        },
        getUser()
      );
      yield put(authWithStoredTokenStart());
    } catch (error) {
      yield put({ type: actionTypes.AUTH_ERROR, payload: error });
    }
  });
  //
}

export function* logoutFlow() {
  yield takeLatest(actionTypes.AUTH_LOGOUT_START, function* () {
    yield call(emptyLocalStorage);
    window.location = "/";
  });
}

export function* authSagas() {
  yield all([
    //
    call(authFlow),
    call(authWithRedirectionTokenFlow),
    call(authWithStoredTokenFlow),
    call(refreshAccessTokenFlow),
    call(logoutFlow),
  ]);
}
