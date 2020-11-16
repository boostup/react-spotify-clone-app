import React, { useEffect } from "react";

import MainLayoutPageWrapper from "../MainLayoutPageWrapper";
import PlaylistBanner from "../../components/PlaylistBanner";
import PlaylistToolbar from "../../components/PlaylistToolbar";
import TrackList from "../../components/TrackList";
import { useDataLayerValue } from "../../state/DataLayer";
import {
  getPlaylistAsync,
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
  const { state, dispatch, token } = useDataLayerValue();
  const { playlist } = state;

  const pageTitle = playlist?.name;
  const tracks = playlist?.tracks.items.map((item) => item.track) || [];

  useEffect(() => {
    // @TODO:
    // window.scrollTo(0, 0); => need to do this for the Body component scroll level
    getPlaylistAsync(id, dispatch);
    dispatch(toggleIsPlaylistPage(true));
    //Cleaning up
    return () => {
      dispatch(toggleDisplayPlaylistToolbar(false));
      dispatch(toggleIsPlaylistPage(false));
    };
  }, [dispatch, id, token]);

  return (
    <MainLayoutPageWrapper title={pageTitle}>
      <div className="playlistPage">
        <PlaylistBanner />
        <PlaylistToolbar onPlay={() => playPlaylist(playlist.id)} />
        <TrackList
          firstLarge={false}
          items={tracks}
          onPlay={(id) => playTrack(id)}
        />
      </div>
    </MainLayoutPageWrapper>
  );
}

export default PlaylistPage;
