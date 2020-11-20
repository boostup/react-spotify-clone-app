import { all, call } from "redux-saga/effects";

import { authSagas } from "./auth/async-actions";
import { homePageSagas } from "./home-page/async-actions";
import { featuredPageSagas } from "./featured-page/async-actions";
import { itemPageSagas } from "./item-page/async-actions";
import { searchPageSagas } from "./search-page/async-actions";
import { userLibraryPageSagas } from "./user-library-page/async-actions";
import { sidebarSagas } from "./sidebar/async-actions";

export default function* rootSaga() {
  yield all([
    //
    call(authSagas),
    call(homePageSagas),
    call(featuredPageSagas),
    call(itemPageSagas),
    call(searchPageSagas),
    call(userLibraryPageSagas),
    call(sidebarSagas),
  ]);
}
