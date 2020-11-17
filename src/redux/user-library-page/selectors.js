import { createSelector } from "reselect";

export const selectUserLibraryPage = (state) => state.userLibraryPage;

export const selectUserLibraryPagePlaylists = createSelector(
  //
  [selectUserLibraryPage],
  (userLibraryPage) => userLibraryPage.myPlaylists
);
