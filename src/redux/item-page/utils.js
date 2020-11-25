import { capitalize } from "utils/string";

export function getFnName(variant, suffix) {
  // return function names like `getAlbum`, `getAlbumTracks`, `setPlaylist` and `getPlaylistTracks`
  return `get${capitalize(variant)}${suffix}`;
}

export function normalizePlaylistTracks(tracks) {
  return tracks.map((i) => i.track);
}

export function addTracks(variant, _prevTracks, _newTracks) {
  let allTracks = [];
  if (_prevTracks.length > 0) {
    allTracks = _prevTracks;
  }
  allTracks.push(
    variant === "playlist" ? normalizePlaylistTracks(_newTracks) : _newTracks
  );

  return allTracks.flat();
}
