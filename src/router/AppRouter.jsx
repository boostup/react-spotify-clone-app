import React from "react";
import { HashRouter as Router, Route, Switch } from "react-router-dom";

import RouteDebugging from "./RouteDebugging";

import SpotifyLogin from "../redirects/SpotifyLogin";
import SpotifyLogout from "../redirects/SpotifyLogout";

import Index from "../pages/Index";
import Home from "../pages/Home";
import NotFoundPage from "../pages/NotFoundPage";
import SearchPage from "../pages/SearchPage";
import UserLibraryPage from "../pages/UserLibraryPage";
import ItemPage from "../pages/ItemPage";
import FeaturedPage from "../pages/FeaturedPage";
import ErrorBoundary from "../components/ErrorBoundary";

const AppRouter = () => {
  return (
    <Router>
      <RouteDebugging>
        <ErrorBoundary>
          <Switch>
            <Route exact path="/" component={Index} />
            <Route exact path="/home" component={Home} />
            <Route exact path="/:variant/:id" component={ItemPage} />
            <Route
              exact
              path="/featured/:trackId/:trackName"
              component={FeaturedPage}
            />
            <Route exact path="/search" component={SearchPage} />
            <Route exact path="/library" component={UserLibraryPage} />
            <Route
              exact
              path="/access_token=:params"
              component={SpotifyLogin}
            />
            <Route path="/logout" component={SpotifyLogout} />
            <Route component={NotFoundPage} />
          </Switch>
        </ErrorBoundary>
      </RouteDebugging>
    </Router>
  );
};
export default AppRouter;
