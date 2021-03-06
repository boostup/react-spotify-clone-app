/**
 * EVENTS - app wide events that different SAGAS can listen to
 */
export const eventsActionTypes = {
  APP_BUSY_START: "APP_BUSY_START",
  APP_BUSY_STOP: "APP_BUSY_STOP",
  TOGGLE_TRACK_HEART_START: "TOGGLE_TRACK_HEART_START",
  TOGGLE_ITEM_HEART_START: "TOGGLE_ITEM_HEART_START",
  TOGGLE_HEART_SUCCESS: "TOGGLE_HEART_SUCCESS",
  TOGGLE_HEART_FAILURE: "TOGGLE_HEART_FAILURE",
};
