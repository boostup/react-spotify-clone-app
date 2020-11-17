import { headerActionTypes as actionTypes } from "./types";

export const toggleHeaderScrolled = (value) => ({
  type: actionTypes.SET_HEADER_SCROLLED,
  payload: value,
});

export const toggleDisplaySearchBar = (displayToggle) => ({
  type: actionTypes.SET_SEARCH_BAR_DISPLAY,
  payload: displayToggle,
});

export const toggleDisplayItemToolbar = (displayToggle) => ({
  type: actionTypes.SET_ITEM_TOOLBAR_DISPLAY,
  payload: displayToggle,
});
