import React, { useEffect } from "react";

import { SET_PLAYLISTS, SET_PLAYLIST } from "../../utils/constants";

import spotifyAPI from "../../utils/spotify";
import { useDataLayerValue } from "../DataLayer";

import Footer from "../Footer";
import HtmlHeadTitle from "../HtmlHeadTitle";
import PlaylistPage from "../PlaylistPage";
import Sidebar from "../Sidebar";

import "./Player.css";

function Player({
  match: {
    params: { id },
  },
}) {
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
      .getPlaylist(id || "37i9dQZEVXcDGlrEgKnU30")
      //
      .then((playlist) =>
        dispatch({
          type: SET_PLAYLIST,
          payload: playlist,
        })
      );
  }, [dispatch, id]);

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
