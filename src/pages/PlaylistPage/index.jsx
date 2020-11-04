import React, { useEffect } from "react";

import PlaylistBanner from "../../components/PlaylistBanner";
import PlaylistToolbar from "../../components/PlaylistToolbar";
import SongList from "../../components/SongList";
import MainLayout from "../../layout/MainLayout";

import { SET_PLAYLISTS, SET_PLAYLIST } from "../../utils/constants";

import spotifyAPI from "../../utils/spotify";
import { useDataLayerValue } from "../../components/DataLayer";

import "./PlaylistPage.css";

function PlaylistPage({
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
    <MainLayout title="Home">
      <div className="playlistPage">
        <PlaylistBanner />
        <PlaylistToolbar />
        <SongList />
      </div>
    </MainLayout>
  );
}

export default PlaylistPage;
