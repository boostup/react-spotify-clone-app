import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import LoggedInOrNot from "../LoggedInOrNot";
import SpotifyRedirect from "../SpotifyRedirect";
import Player from "../Player";

const AppRouter = () => {
  return (
    <BrowserRouter>
      <div className="main">
        <Switch>
          <Route exact path="/" component={LoggedInOrNot} />
          <Route exact path="/home" component={Player} />
          <Route path="/spotify_redirect" component={SpotifyRedirect} />
        </Switch>
      </div>
    </BrowserRouter>
  );
};
export default AppRouter;
