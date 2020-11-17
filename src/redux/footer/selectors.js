import { createSelector } from "reselect";

export const selectFooter = (state) => state.footer;

export const selectFooterCurrentPlaybackState = createSelector(
  //
  [selectFooter],
  (footer) => footer.currentplaybackState
);
