import { createSelector } from "reselect";

export const selectItemPage = (state) => state.itemPage;

export const selectIsItemPage = createSelector(
  //
  [selectItemPage],
  (itemPage) => itemPage.isItemPage
);

export const selectItem = createSelector(
  //
  [selectItemPage],
  (itemPage) => itemPage.item
);

export const selectItemTracks = createSelector(
  //
  [selectItem],
  (item) => item?.tracks
);
