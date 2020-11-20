import { headerActionTypes as actionTypes } from "./types.js";

const initialState = {
  displayItemToolbar: false,
  displaySearchBar: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_ITEM_TOOLBAR_DISPLAY:
      return {
        ...initialState,
        displayItemToolbar: action.payload,
      };

    case actionTypes.SET_SEARCH_BAR_DISPLAY:
      return {
        ...state,
        displaySearchBar: action.payload,
      };

    default:
      return state;
  }
};

export default reducer;
