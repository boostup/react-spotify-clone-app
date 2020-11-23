import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { HashRouter as Router, Route, Switch } from "react-router-dom";

import RouteDebugging from "./RouteDebugging";

import { selectAuthUser } from "redux/auth/selectors";
import { authStart } from "redux/auth/actions";
import SpotifyLogin from "redirects/SpotifyLogin";

import LoginPage from "pages/LoginPage";
import Home from "pages/Home";
// import NotFoundPage from "pages/NotFoundPage";
import SearchPage from "pages/SearchPage";
import UserLibraryPage from "pages/UserLibraryPage";
import ItemPage from "pages/ItemPage";
import FeaturedPage from "pages/FeaturedPage";
import ErrorBoundary from "components/ErrorBoundary";

const AppRouter = () => {
  const dispatch = useDispatch();
  const [isSignedIn, setIsSignedIn] = useState(false);
  const stateUser = useSelector(selectAuthUser);

  useEffect(() => {
    dispatch(authStart());
  }, [dispatch]);

  useEffect(() => {
    stateUser && setIsSignedIn(true);
  }, [stateUser]);

  return (
    <Router>
      <RouteDebugging>
        <ErrorBoundary>
          <Switch>
            {isSignedIn ? (
              <>
                <Route exact path="/">
                  <Home />
                </Route>
                <Route
                  exact
                  path="/:variant(playlist|album)/:id"
                  component={ItemPage}
                />
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
                <Route exact path="/spotify_redirect">
                  <SpotifyLogin />
                </Route>
                {/* <Route>
                  <NotFoundPage />
                </Route> */}
              </>
            ) : (
              <>
                <Route exact path="/spotify_redirect">
                  <SpotifyLogin />
                </Route>
                <Route>
                  <LoginPage />
                </Route>
              </>
            )}
          </Switch>
        </ErrorBoundary>
      </RouteDebugging>
    </Router>
  );
};
export default AppRouter;
