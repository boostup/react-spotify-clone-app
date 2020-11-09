import React, { useEffect } from "react";

import { actionTypes } from "../../state/actionTypes";
import { spotifyAPI } from "../../utils/spotify";
import { hydrateSpotifyApi } from "../../utils/hydrateSpotifyApi";

import MainLayoutPageWrapper from "../MainLayoutPageWrapper";
import PlaylistBanner from "../../components/PlaylistBanner";
import PlaylistToolbar from "../../components/PlaylistToolbar";
import TrackList from "../../components/TrackList";
import { useDataLayerValue } from "../../state/DataLayer";

import "./PlaylistPage.css";

function PlaylistPage({
  match: {
    params: { id },
  },
}) {
  const { state, dispatch } = useDataLayerValue();
  const { playlist } = state;

  useEffect(() => {
    spotifyAPI
      .getPlaylist(id || "37i9dQZEVXcDGlrEgKnU30")
      //
      .then((playlist) =>
        dispatch({
          type: actionTypes.SET_PLAYLIST,
          payload: playlist,
        })
      )
      .catch((error) => {
        hydrateSpotifyApi(error, dispatch);
      });

    spotifyAPI
      .getUserPlaylists()
      .then((playlists) => {
        dispatch({
          type: actionTypes.SET_PLAYLISTS,
          payload: playlists,
        });
      })
      .catch((error) => {
        hydrateSpotifyApi(error, dispatch);
      });

    spotifyAPI
      .getMyCurrentPlaybackState()
      .then((res) => {
        if (res === "") return; //No tracks currently playing
        dispatch({
          type: actionTypes.SET_CURRENT_PLAYBACK_STATE,
          payload: res,
        });
      })
      .catch((error) => {
        console.log(error);
        hydrateSpotifyApi(error, dispatch);
      });
  }, [dispatch, id, state.token]);

  const pageTitle = playlist?.name || "Home";

  return (
    <MainLayoutPageWrapper title={pageTitle}>
      <div className="playlistPage">
        <PlaylistBanner />
        <PlaylistToolbar />
        <TrackList />
      </div>
    </MainLayoutPageWrapper>
  );
}

export default PlaylistPage;
