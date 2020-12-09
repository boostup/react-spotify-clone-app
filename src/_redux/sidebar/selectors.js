import { createSelector } from "reselect";

export const selectSidebar = (state) => state.sidebar;

export const selectSidebarPlaylists = createSelector(
  //
  [selectSidebar],
  (sidebar) => sidebar.sidebarPlaylists
);

export const selectSidebarVisibility = createSelector(
  //
  [selectSidebar],
  (sidebar) => sidebar.sidebarVisible
);
