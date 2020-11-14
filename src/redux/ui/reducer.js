import { actionTypes } from "../../state/actionTypes";

const initialState = {
  displaySearchBar: false,
  headerScrolled: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_HEADER_SCROLLED:
      return {
        ...state,
        headerScrolled: action.payload,
      };

    default:
      return state;
  }
};

export default reducer;
