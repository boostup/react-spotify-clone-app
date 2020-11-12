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
    getPlaylistAsync(id, dispatch);
    getPlaylistsAync(dispatch);
  }, [dispatch, id, state.token]);

  const pageTitle = playlist?.name || "Home";

  return (
    <MainLayoutPageWrapper title={pageTitle}>
      <div className="playlistPage">
        <PlaylistBanner />
        <PlaylistToolbar onPlay={() => playPlaylist(playlist.id)} />
        <TrackList onPlay={(id) => playTrack(id)} />
      </div>
    </MainLayoutPageWrapper>
  );
}

export default PlaylistPage;
