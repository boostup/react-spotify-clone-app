import { createSelector } from "reselect";

export const selectHeader = (state) => state.header;

export const selectHeaderClickToggle = createSelector(
  [selectHeader],
  (header) => header.clickToggle
);
