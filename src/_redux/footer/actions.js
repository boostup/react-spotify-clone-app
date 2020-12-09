import { footerActionTypes as actionTypes } from "./types";

export const fetchCurrentPlaybackState = () => ({
  type: actionTypes.FETCH_CURRENT_PLAYBACK_STATE_START,
});

export const setCurrentPlaybackState = (payload) => ({
  type: actionTypes.SET_CURRENT_PLAYBACK_STATE,
  payload: payload,
});

export const caughtRemoteControlApiError = (error) => ({
  type: actionTypes.REMOTE_CONTROL_API_ERROR,
  payload: error,
});

export const cleanRemoteControlApiError = () => ({
  type: actionTypes.CLEAN_REMOTE_CONTROL_API_ERROR,
});
