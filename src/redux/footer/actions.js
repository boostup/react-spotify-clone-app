import { footerActionTypes as actionTypes } from "./types";

export const setCurrentPlaybackState = (payload) => ({
  type: actionTypes.SET_CURRENT_PLAYBACK_STATE,
  payload: payload,
});
