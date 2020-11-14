import React, { useEffect } from "react";

import MainLayoutPageWrapper from "../MainLayoutPageWrapper";
import PlaylistBanner from "../../components/PlaylistBanner";
import PlaylistToolbar from "../../components/PlaylistToolbar";
import TrackList from "../../components/TrackList";
import { useDataLayerValue } from "../../state/DataLayer";
import {
  getPlaylistAsync,
  getPlaylistsAync,
  playPlaylist,
  playTrack,
  toggleIsPlaylistPage,
  toggleDisplayPlaylistToolbar,
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
    // @TODO:
    // window.scrollTo(0, 0); => need to do this for the Body component scroll level

    dispatch(toggleIsPlaylistPage(true));
    //Cleaning up
    return () => {
      dispatch(toggleDisplayPlaylistToolbar(false));
      dispatch(toggleIsPlaylistPage(false));
    };
  }, [dispatch]);

  useEffect(() => {
    getPlaylistAsync(id, dispatch);
    getPlaylistsAync(dispatch);
  }, [dispatch, id, state.token]);

  const pageTitle = playlist?.name || "Home";

  return (
    <MainLayoutPageWrapper title={pageTitle}>
      <div className="playlistPage">
        <PlaylistBanner />
        <PlaylistToolbar onPlay={() => playPlaylist(playlist.id)} />
        <TrackList playlist={playlist} onPlay={(id) => playTrack(id)} />
      </div>
    </MainLayoutPageWrapper>
  );
}

export default PlaylistPage;
