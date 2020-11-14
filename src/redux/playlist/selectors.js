import { createSelector } from "reselect";

const selectPlaylist = (state) => state.playlists;

export const selectPlaylistTracks = createSelector(
  [selectPlaylist],
  (playlist) => playlist.tracks.items
);
