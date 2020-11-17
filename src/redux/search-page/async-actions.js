import { spotifyAPI, hydrateSpotifyApi } from "../../libs/spotify";
import { setSearchResults } from "./actions";

export function searchSpotifyAsync(searchString, dispatch) {
  spotifyAPI
    .search(searchString, ["artist", "album", "playlist"])
    .then((results) => {
      dispatch(setSearchResults(results));
    })
    .catch((error) => {
      hydrateSpotifyApi(error, dispatch);
    });
}
