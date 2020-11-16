import React, { useEffect } from "react";
import TrackList from "../../components/TrackList";
import {
  getMyTopTracksAsync,
  getMyRecentTracksAsync,
  getPlaylistsAync,
  playTrack,
} from "../../state/actions";
import { useDataLayerValue } from "../../state/DataLayer";
import MainLayoutPageWrapper from "../MainLayoutPageWrapper";

function Home() {
  const pageTitle = "Home";
  const { state, dispatch } = useDataLayerValue();
  const { topTracks, recentTracks, token } = state;

  useEffect(() => {
    getPlaylistsAync(dispatch);
    getMyTopTracksAsync(dispatch);
    getMyRecentTracksAsync(dispatch);
  }, [dispatch, token]);

  return (
    <MainLayoutPageWrapper title={pageTitle}>
      <div className="homePage">
        <h1>Your Top Tracks</h1>
        {<TrackList items={topTracks} onPlay={(id) => playTrack(id)} />}
        <h1>Recently Played</h1>
        <TrackList items={recentTracks} onPlay={(id) => playTrack(id)} />
      </div>
    </MainLayoutPageWrapper>
  );
}

export default Home;
