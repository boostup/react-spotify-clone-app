import { itemPageActionTypes as actionTypes } from "./types";

export const initialState = {
  isFetching: false,
  error: null,
  success: null,
  isItemPage: false,
  item: null, //an object that holds either an album or playlist information, used in the `ItemPage` as variant objects
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_ITEM_PAGE_DATA_START:
      return {
        ...initialState,
        isFetching: true,
      };

    case actionTypes.FETCH_ITEM_PAGE_DATA_ERROR:
      return {
        ...initialState,
        isFetching: false,
        success: false,
        error: action.payload,
      };

    case actionTypes.FETCH_ITEM_PAGE_DATA_SUCCESS:
      return {
        ...state,
        isFetching: false,
        error: false,
        success: true,
      };

    case actionTypes.SET_IS_ITEM_PAGE:
      return {
        ...state,
        isItemPage: action.payload,
      };

    case actionTypes.SET_ITEM:
      return {
        ...state,
        item: action.payload,
      };

    case actionTypes.SET_PLAYLIST_IS_FOLLOWER:
      return {
        ...state,
        item: {
          ...state.playlist,
          isFollower: action.payload,
        },
      };

    default:
      return state;
  }
};

export default reducer;
