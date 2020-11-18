import React from "react";
import { useSelector } from "react-redux";
import {
  HashRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";

import RouteDebugging from "./RouteDebugging";

import { selectAuthUser } from "../redux/auth/selectors";
import SpotifyLogin from "../redirects/SpotifyLogin";
import SpotifyLogout from "../redirects/SpotifyLogout";

import LoginPage from "../pages/LoginPage";
import Home from "../pages/Home";
import NotFoundPage from "../pages/NotFoundPage";
import SearchPage from "../pages/SearchPage";
import UserLibraryPage from "../pages/UserLibraryPage";
import ItemPage from "../pages/ItemPage";
import FeaturedPage from "../pages/FeaturedPage";
import ErrorBoundary from "../components/ErrorBoundary";

const AppRouter = () => {
  const user = useSelector(selectAuthUser);
  return (
    <Router>
      <RouteDebugging>
        <ErrorBoundary>
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route exact path="/:variant/:id" component={ItemPage} />
            <Route
              exact
              path="/featured/:trackId/:trackName"
              component={FeaturedPage}
            />
            <Route exact path="/search">
              <SearchPage />
            </Route>
            <Route exact path="/library">
              <UserLibraryPage />
            </Route>
            <Route exact path="/access_token=:params">
              <SpotifyLogin />
            </Route>
            <Route exact path="/login">
              {user ? <Redirect to="/" /> : <LoginPage />}
            </Route>
            <Route path="/logout">
              <SpotifyLogout />
            </Route>
            <Route>
              <NotFoundPage />
            </Route>
          </Switch>
        </ErrorBoundary>
      </RouteDebugging>
    </Router>
  );
};
export default AppRouter;
