import { spotifyAPI, hydrateSpotifyApi } from "../../libs/spotify";
import { setIsPlaylistFollower, setItem } from "./actions";

export function getPlaylistAsync(id, dispatch) {
  spotifyAPI
    .getPlaylist(id)
    //
    .then((playlist) => {
      dispatch(setItem(playlist));
    })
    .catch((error) => {
      hydrateSpotifyApi(error, dispatch);
    });
}

export function getAlbumAsync(id, dispatch) {
  spotifyAPI
    .getAlbum(id)
    //
    .then((album) => {
      dispatch(setItem(album));
    })
    .catch((error) => {
      hydrateSpotifyApi(error, dispatch);
    });
}

export function isPlaylistFollowedByUser({ playlistId, userId }, dispatch) {
  spotifyAPI
    .areFollowingPlaylist(playlistId, [userId])
    .then((data) => {
      return dispatch(setIsPlaylistFollower(data[0]));
    })
    .catch((error) => {
      hydrateSpotifyApi(error, dispatch);
    });
}

export function togglefollowPlaylist({ id, follow }) {
  follow
    ? //
      spotifyAPI.areFollowingPlaylist.followPlaylist(id)
    : spotifyAPI.unfollowPlaylist(id);
}
