import { authActionTypes as actionTypes } from "./types.js";

const initialState = {
  token: "",
  tokenExpiry: 0,
  user: null,
  error: null,
  success: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.AUTH_ERROR:
      return {
        ...initialState,
        error: action.payload,
      };

    case actionTypes.AUTH_SUCCESS:
      return {
        ...state,
        success: true,
        error: null,
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
