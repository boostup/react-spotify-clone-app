import React from "react";
import { HashRouter as Router, Route, Switch } from "react-router-dom";

import LoggedInOrNot from "../components/LoggedInOrNot";
import SpotifyLogin from "../components/SpotifyLogin";
import SpotifyLogout from "../components/SpotifyLogout";

// import Player from "../components/Player";
import NotFoundPage from "../pages/NotFoundPage";
import YourLibraryPage from "../pages/YourLibraryPage";
import PlaylistPage from "../pages/PlaylistPage";

const AppRouter = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={LoggedInOrNot} />
        <Route exact path="/home" component={PlaylistPage} />
        <Route exact path="/playlist/:id" component={PlaylistPage} />
        <Route exact path="/library" component={YourLibraryPage} />
        <Route exact path="/access_token=:params" component={SpotifyLogin} />
        <Route path="/logout" component={SpotifyLogout} />
        <Route component={NotFoundPage} />
      </Switch>
    </Router>
  );
};
export default AppRouter;
