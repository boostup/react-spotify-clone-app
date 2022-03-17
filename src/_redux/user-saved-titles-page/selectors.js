import { createSelector } from "reselect";

export const selectUserSavedTitlesPage = (state) => state.userSavedTitlesPage;

export const selectUserSavedTitles = createSelector(
  //
  [selectUserSavedTitlesPage],
  (userSavedTitlesPage) => userSavedTitlesPage.savedTitles
);
