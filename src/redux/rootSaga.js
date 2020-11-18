import { all, call } from "redux-saga/effects";

import { authSagas } from "./auth/async-actions";
import { homePageSagas } from "./home-page/async-actions";

export default function* rootSaga() {
  yield all([
    //
    call(authSagas),
    call(homePageSagas),
  ]);
}
