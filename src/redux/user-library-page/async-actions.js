import { spotifyAPI, hydrateSpotifyApi } from "../../libs/spotify";
import { setMyPlaylists } from "./actions";

export function getMyPlaylistsAync(dispatch) {
  spotifyAPI
    .getUserPlaylists()
    .then((playlists) => {
      dispatch(setMyPlaylists(playlists));
    })
    .catch((error) => {
      hydrateSpotifyApi(error, dispatch);
    });
}
