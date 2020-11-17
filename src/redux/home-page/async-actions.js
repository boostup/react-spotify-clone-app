import { spotifyAPI, hydrateSpotifyApi } from "../../libs/spotify";
import { setMySavedTracks, setRecentTracks, setTopTracks } from "./actions";

export function getMyTopTracksAsync(dispatch) {
  spotifyAPI
    .getMyTopTracks({ limit: 5 })
    .then((data) => dispatch(setTopTracks(data.items)))
    .catch((error) => {
      hydrateSpotifyApi(error, dispatch);
    });
}

export function getMySavedTracksAsync(dispatch) {
  spotifyAPI
    .getMySavedTracks({ limit: 5 })
    .then((data) => {
      return data.items.map((item) => item.track);
    })
    .then((tracks) => dispatch(setMySavedTracks(tracks)))
    .catch((error) => {
      hydrateSpotifyApi(error, dispatch);
    });
}

export function addToMySavedTracks(trackId) {
  spotifyAPI.addToMySavedTracks({ ids: [trackId] });
}

export function getMyRecentTracksAsync(dispatch) {
  spotifyAPI
    .getMyRecentlyPlayedTracks({ limit: 5 })
    .then((data) => {
      return data.items.map((item) => item.track);
    })
    .then((tracks) => dispatch(setRecentTracks(tracks)))
    .catch((error) => {
      hydrateSpotifyApi(error, dispatch);
    });
}
