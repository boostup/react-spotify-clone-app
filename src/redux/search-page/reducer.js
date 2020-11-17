import { searchPageActionTypes as actionTypes } from "./types.js";

const initialState = {
  searchResults: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_SEARCH_RESULTS:
      return {
        ...state,
        searchResults: action.payload,
      };

    default:
      return state;
  }
};

export default reducer;
