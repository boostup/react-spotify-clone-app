import { headerActionTypes as actionTypes } from "./types.js";

const initialState = {
  displayItemToolbar: false,
  displaySearchBar: false,
  headerScrolled: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_ITEM_TOOLBAR_DISPLAY:
      return {
        ...state,
        displayItemToolbar: action.payload,
      };

    case actionTypes.SET_HEADER_SCROLLED:
      return {
        ...state,
        headerScrolled: action.payload,
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
