import { spotifyAPI, hydrateSpotifyApi } from "../../libs/spotify";
import { setMyPlaylistsFeatured, setMyRecommendedTracks } from "./actions";

export function getRecommendationsAsync(trackId, dispatch) {
  spotifyAPI
    .getRecommendations({
      seed_tracks: trackId,
      limit: 20,
    })
    .then((data) => dispatch(setMyRecommendedTracks(data.tracks)))
    .catch((error) => {
      hydrateSpotifyApi(error, dispatch);
    });
}

export function getMyPlaylistsFeaturedAsync(dispatch) {
  spotifyAPI
    .getFeaturedPlaylists({ limit: 5, locale: navigator.language || "en-US" })
    .then((data) => {
      return dispatch(setMyPlaylistsFeatured(data));
    })
    .catch((error) => {
      hydrateSpotifyApi(error, dispatch);
    });
}
