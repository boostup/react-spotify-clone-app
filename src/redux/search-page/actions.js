import { searchPageActionTypes as actionTypes } from "./types";

export const setSearchResults = (results) => ({
  type: actionTypes.SET_SEARCH_RESULTS,
  payload: results,
});
