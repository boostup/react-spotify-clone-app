import { featuredPageActionTypes as actionTypes } from "./types";

export const fetchFeaturedPageDataStart = (trackId) => ({
  type: actionTypes.FETCH_FEATURED_PAGE_DATA_START,
  trackId,
});

export const setMyRecommendedTracks = (tracks) => ({
  type: actionTypes.SET_MY_RECOMMENDED_TRACKS,
  payload: tracks,
});