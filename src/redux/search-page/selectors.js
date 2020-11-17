import { createSelector } from "reselect";

export const selectSearchPage = (state) => state.searchPage;

export const selectSearchPageSearchResults = createSelector(
  //
  [selectSearchPage],
  (searchPage) => searchPage.searchResults
);
