import { actionTypes } from "../../state/actionTypes";

const initialState = {
  tracks: {
    items: [
      {
        id: 1015151,
        duration_ms: 10004545000,
        album: {
          name: "Album name",
          images: [
            {
              url: "https://via.placeholder.com/175.png/09f/fff%20C/?text=1",
            },
          ],
        },
        name: "track 1",
        explicit: true,
        artists: [{ name: "fred" }],
      },
      {
        id: "1015asdasd151",
        duration_ms: 10022220000,
        album: {
          name: "Album name 2",
          images: [
            {
              url: "https://via.placeholder.com/175.png/09f/fff%20C/?text=2",
            },
          ],
        },
        name: "track 2",
        explicit: false,
        artists: [{ name: "Leslie" }],
      },
    ],
  },
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_PLAYLIST:
      return {
        ...state,
        tracks: action.payload,
      };

    default:
      return state;
  }
};

export default reducer;
