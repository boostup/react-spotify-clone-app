import { footerActionTypes as actionTypes } from "./types.js";

const initialState = {
  error: null,
  currentplaybackState: null, //includes current Playing Track => currentplaybackState.item
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.REMOTE_CONTROL_API_ERROR:
      return {
        ...state,
        error: action.payload,
      };

    case actionTypes.SET_CURRENT_PLAYBACK_STATE:
      return {
        ...state,
        error: null,
        currentplaybackState: action.payload,
      };

    default:
      return state;
  }
};

export default reducer;
