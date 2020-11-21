import { createSelector } from "reselect";

export const selectFooter = (state) => state.footer;

export const selectFooterError = createSelector(
  [selectFooter],
  (footer) => footer.error
);

export const selectFooterCurrentPlaybackState = createSelector(
  //
  [selectFooter],
  (footer) => footer.currentplaybackState
);
