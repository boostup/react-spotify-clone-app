import React, { useEffect } from "react";
import {
  getMyTopTracksAsync,
  getMyRecentTracksAsync,
  getPlaylistsAync,
  playTrack,
  getMySavedTracksAsync,
} from "../../state/actions";
import { useDataLayerValue } from "../../state/DataLayer";

import MainLayoutPageWrapper from "../MainLayoutPageWrapper";
import TrackList from "../../components/TrackList";

import SavedTracksIcon from "@material-ui/icons/Favorite";
import TopTracksIcon from "@material-ui/icons/Whatshot";
import RecentTracksIcon from "@material-ui/icons/TrendingUp";

import "./Home.css";

function Home() {
  const pageTitle = "Home";
  const { state, dispatch } = useDataLayerValue();
  const { savedTracks, topTracks, recentTracks, token } = state;

  useEffect(() => {
    getPlaylistsAync(dispatch);
    getMySavedTracksAsync(dispatch);
    getMyTopTracksAsync(dispatch);
    getMyRecentTracksAsync(dispatch);
  }, [dispatch, token]);

  return (
    <MainLayoutPageWrapper title={pageTitle}>
      <div className="homePage">
        <h1>
          <SavedTracksIcon className="mainLayout__icon" /> Saved Tracks
        </h1>
        {<TrackList items={savedTracks} onPlay={(id) => playTrack(id)} />}

        <h1>
          <TopTracksIcon className="mainLayout__icon" /> Your Top Tracks
        </h1>
        {<TrackList items={topTracks} onPlay={(id) => playTrack(id)} />}

        <h1>
          <RecentTracksIcon className="mainLayout__icon" />
          Recently Played
        </h1>
        <TrackList items={recentTracks} onPlay={(id) => playTrack(id)} />
      </div>
    </MainLayoutPageWrapper>
  );
}

export default Home;
