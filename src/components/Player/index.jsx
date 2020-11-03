import React, { useEffect } from "react";

import { SET_PLAYLISTS, SET_DISCOVER_WEEKLY } from "../../utils/constants";

import spotifyAPI from "../../utils/spotify";
import { useDataLayerValue } from "../DataLayer";

import Footer from "../Footer";
import HtmlHeadTitle from "../HtmlHeadTitle";
import PlaylistPage from "../PlaylistPage";
import Sidebar from "../Sidebar";

import "./Player.css";

function Player() {
  const { dispatch } = useDataLayerValue();

  useEffect(() => {
    spotifyAPI
      .getUserPlaylists()
      //
      .then((playlists) => {
        dispatch({
          type: SET_PLAYLISTS,
          payload: playlists,
        });
      });

    spotifyAPI
      .getPlaylist("37i9dQZEVXcDGlrEgKnU30")
      //
      .then((playlist) =>
        dispatch({
          type: SET_DISCOVER_WEEKLY,
          payload: playlist,
        })
      );
  }, [dispatch]);

  return (
    <>
      <HtmlHeadTitle title="Home" />
      <div className="player">
        <div className="player__body">
          <Sidebar />
          <PlaylistPage />
        </div>
        <Footer />
      </div>
    </>
  );
}

export default Player;
