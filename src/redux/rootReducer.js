import { combineReducers } from "redux";

import uiReducer from "./ui/reducer";
import playlistReducer from "./playlist/reducer";

const rootReducer = combineReducers({
  ui: uiReducer,
  playlists: playlistReducer,
});

export default rootReducer;
