import { headerActionTypes as actionTypes } from "./types.js";

const initialState = {
  displayItemToolbar: false,
  displaySearchBar: false,
  clickToggle: false,
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

    case actionTypes.TOGGLE_HEADER_CLICK:
      return {
        ...state,
        clickToggle: !state.clickToggle,
      };

    default:
      return state;
  }
};

export default reducer;
