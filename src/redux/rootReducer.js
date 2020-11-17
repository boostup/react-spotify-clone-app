import { combineReducers } from "redux";

import authReducer from "./auth/reducer";
import featuredPageReducer from "./featured-page/reducer";
import footerReducer from "./footer/reducer";
import headerReducer from "./header/reducer";
import homePageReducer from "./home-page/reducer";
import itemPageReducer from "./item-page/reducer";
import searchPageReducer from "./search-page/reducer";
import sidebarReducer from "./sidebar/reducer";
import userLibraryPageReducer from "./user-library-page/reducer";

const rootReducer = combineReducers({
  auth: authReducer,
  featuredPage: featuredPageReducer,
  footer: footerReducer,
  header: headerReducer,
  homePage: homePageReducer,
  itemPage: itemPageReducer,
  searchPage: searchPageReducer,
  sidebar: sidebarReducer,
  userLibraryPage: userLibraryPageReducer,
});

export default rootReducer;
