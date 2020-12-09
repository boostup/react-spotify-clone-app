import { eventsActionTypes as actionTypes } from "./types";

export const toggleTrackHeartStart = (trackId, status) => ({
  type: actionTypes.TOGGLE_TRACK_HEART_START,
  payload: { trackId, status },
});

export const toggleItemHeartStart = (itemId, variant, status) => ({
  type: actionTypes.TOGGLE_ITEM_HEART_START,
  payload: { itemId, variant, status },
});

export const toggleHeartSuccess = () => ({
  type: actionTypes.TOGGLE_HEART_SUCCESS,
});

export const toggleHeartFailure = () => ({
  type: actionTypes.TOGGLE_HEART_FAILURE,
});
