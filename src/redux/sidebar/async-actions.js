import { spotifyAPI, hydrateSpotifyApi } from "../../libs/spotify";
import { setSidebarPlaylists } from "./actions";

export function getSidebarPlaylistsAsync(dispatch) {
  spotifyAPI
    .getUserPlaylists()
    .then((playlists) => {
      dispatch(setSidebarPlaylists(playlists));
    })
    .catch((error) => {
      hydrateSpotifyApi(error, dispatch);
    });
}
