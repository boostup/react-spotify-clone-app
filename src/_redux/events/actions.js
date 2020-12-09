import { eventsActionTypes as actionTypes } from "./types";

export const toggleTrackHeartStart = (trackId, status) => ({
  type: actionTypes.TOGGLE_TRACK_HEART_START,
  payload: { trackId, status },
});

export const toggleTrackHeartSuccess = () => ({
  type: actionTypes.TOGGLE_TRACK_HEART_SUCCESS,
});
