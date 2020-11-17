import { authActionTypes as actionTypes } from "./types.js";

const initialState = {
  token: "",
  tokenExpiry: 0,
  user: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_TOKEN:
      return {
        ...state,
        token: action.payload,
      };

    case actionTypes.SET_TOKEN_EXPIRY:
      return {
        ...state,
        tokenExpiry: action.payload,
      };

    case actionTypes.SET_USER:
      return {
        ...state,
        user: action.payload,
      };

    default:
      return state;
  }
};

export default reducer;
