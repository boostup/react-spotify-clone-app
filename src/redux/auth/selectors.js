import { createSelector } from "reselect";

const selectAuth = (state) => state.auth;

export const selectAuthToken = createSelector(
  //
  [selectAuth],
  (auth) => auth.token
);

export const selectAuthUser = createSelector(
  //
  [selectAuth],
  (auth) => auth.user
);
