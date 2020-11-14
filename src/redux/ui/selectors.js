import { createSelector } from "reselect";

const selectUI = (state) => state.ui;

export const selectHeaderScrolled = createSelector(
  [selectUI],
  (ui) => ui.headerScrolled
);
