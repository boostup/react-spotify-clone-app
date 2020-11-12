import React, { useEffect } from "react";

import { spotifyAPI, hydrateSpotifyApi } from "../../libs/spotify";

import MainLayoutPageWrapper from "../MainLayoutPageWrapper";
import PlaylistBanner from "../../components/PlaylistBanner";
import PlaylistToolbar from "../../components/PlaylistToolbar";
import TrackList from "../../components/TrackList";
import { useDataLayerValue } from "../../state/DataLayer";
import {
  playPlaylist,
  playTrack,
  setPlaylist,
  setPlaylists,
} from "../../state/actions";

import "./PlaylistPage.css";

function PlaylistPage({
  match: {
    params: { id },
  },
}) {
  const { state, dispatch } = useDataLayerValue();
  const { playlist } = state;

  useEffect(() => {
    /**
     *
     * getPlaylist
     */
    spotifyAPI
      .getPlaylist(id || "37i9dQZEVXcDGlrEgKnU30")
      //
      .then((playlist) => dispatch(setPlaylist(playlist)))
      .catch((error) => {
        hydrateSpotifyApi(error, dispatch);
      });

    /**
     *
     * getUserPlaylists
     */
    spotifyAPI
      .getUserPlaylists()
      .then((playlists) => {
        dispatch(setPlaylists(playlists));
      })
      .catch((error) => {
        hydrateSpotifyApi(error, dispatch);
      });
  }, [dispatch, id, state.token]);

  const pageTitle = playlist?.name || "Home";

  return (
    <MainLayoutPageWrapper title={pageTitle}>
      <div className="playlistPage">
        <PlaylistBanner />
        <PlaylistToolbar onPlay={() => playPlaylist(dispatch, playlist.id)} />
        <TrackList onPlay={(id) => playTrack(dispatch, id)} />
      </div>
    </MainLayoutPageWrapper>
  );
}

export default PlaylistPage;
