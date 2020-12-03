import { searchPageActionTypes as actionTypes } from "./types";

export const fetchSearchPageDataStart = (searchTerm) => ({
  type: actionTypes.FETCH_SEARCH_PAGE_DATA_START,
  searchTerm,
});

export const setSearchResults = (results) => ({
  type: actionTypes.SET_SEARCH_RESULTS,
  payload: results,
});
