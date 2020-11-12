import { actionTypes } from "./actionTypes";
import { spotifyAPI, hydrateSpotifyApi } from "../libs/spotify";

export function getMyCurrentPlaybackState(dispatch) {
  spotifyAPI
    .getMyCurrentPlaybackState()
    .then((res) => {
      if (res === "") return; //No tracks currently playing
      dispatch({
        type: actionTypes.SET_CURRENT_PLAYBACK_STATE,
        payload: res,
      });
    })
    .catch((error) => {
      console.log(error);
      hydrateSpotifyApi(error, dispatch);
    });
}

/**
 * playPlaylist
 *
 * @param {*} id
 */
export const playPlaylist = (dispatch, id) => {
  spotifyAPI
    .play({
      context_uri: `spotify:playlist:${id}`,
    })
    .then(() => getMyCurrentPlaybackState(dispatch));
};

/**
 * playTrack
 *
 * @param {*} id
 */
export const playTrack = (dispatch) => (id) => {
  spotifyAPI
    .play({
      uris: [`spotify:track:${id}`],
    })
    .then(() => getMyCurrentPlaybackState(dispatch));
};
