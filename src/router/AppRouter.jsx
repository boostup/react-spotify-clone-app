import React from "react";
import { HashRouter as Router, Route, Switch } from "react-router-dom";

import RouteDebugging from "./RouteDebugging";
import PrivateRoute from "./PrivateRoute";

import SpotifyLogin from "redirects/SpotifyLogin";
import LoginPage from "pages/LoginPage";
import Home from "pages/Home";
import NotFoundPage from "pages/NotFoundPage";
import SearchPage from "pages/SearchPage";
import UserLibraryPage from "pages/UserLibraryPage";
import ItemPage from "pages/ItemPage";
import FeaturedPage from "pages/FeaturedPage";
import ErrorBoundary from "components/ErrorBoundary";
import UserSavedTitles from "pages/UserSavedTitles";

const AppRouter = () => {
  return (
    <Router>
      <RouteDebugging>
        <ErrorBoundary>
          <Switch>
            <PrivateRoute path="/:variant(playlist|album)/:id">
              <ItemPage />
            </PrivateRoute>
            <PrivateRoute path="/featured/:trackId/:trackName">
              <FeaturedPage />
            </PrivateRoute>
            <PrivateRoute path="/search">
              <SearchPage />
            </PrivateRoute>
            <PrivateRoute path="/library">
              <UserLibraryPage />
            </PrivateRoute>
            <PrivateRoute path="/savedtitles">
              <UserSavedTitles />
            </PrivateRoute>
            <PrivateRoute exact path="/">
              <Home />
            </PrivateRoute>
            <Route path="/spotify_redirect">
              <SpotifyLogin />
            </Route>
            <Route path="/login">
              <LoginPage />
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
