import { footerActionTypes as actionTypes } from "./types.js";

const initialState = {
  currentplaybackState: null, //includes current Playing Track => currentplaybackState.item
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_CURRENT_PLAYBACK_STATE:
      return {
        ...state,
        currentplaybackState: action.payload,
      };

    default:
      return state;
  }
};

export default reducer;
