import React, { useEffect } from "react";

import { actionTypes } from "../../state/actionTypes";
import { spotifyAPI, hydrateSpotifyApi } from "../../libs/spotify";

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

    /**
     *
     *
     */
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

    /**
     *
     *
     */
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

  /**
   *
   * @param {*} id
   */
  const playPlaylist = (id) => {
    spotifyAPI
      .play({
        context_uri: `spotify:playlist:${id}`,
      })
      .then((res) => {
        spotifyAPI.getMyCurrentPlayingTrack().then((r) => {
          dispatch({
            type: "SET_ITEM",
            item: r.item,
          });
          dispatch({
            type: "SET_PLAYING",
            playing: true,
          });
        });
      });
  };

  /**
   *
   * @param {*} id
   */
  const playTrack = (id) => {
    spotifyAPI
      .play({
        uris: [`spotify:track:${id}`],
      })
      .then((res) => {
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
      });
  };

  const pageTitle = playlist?.name || "Home";

  return (
    <MainLayoutPageWrapper title={pageTitle}>
      <div className="playlistPage">
        <PlaylistBanner />
        <PlaylistToolbar onPlay={() => playPlaylist(playlist.id)} />
        <TrackList onPlay={playTrack} />
      </div>
    </MainLayoutPageWrapper>
  );
}

export default PlaylistPage;
