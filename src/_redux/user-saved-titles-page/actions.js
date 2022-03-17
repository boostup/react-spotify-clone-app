import { userSavedTitlesActionTypes as actionTypes } from "./types";

export const fetchUserSavedTitlesDataStart = () => ({
  type: actionTypes.FETCH_USER_SAVED_TITLES_START,
});

export const setMySavedTitles = (savedTitles) => ({
  type: actionTypes.SET_USER_SAVED_TITLES,
  payload: savedTitles,
});
