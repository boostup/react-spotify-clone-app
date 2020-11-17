import React, { useEffect } from "react";
import {
  getMyTopTracksAsync,
  getMyRecentTracksAsync,
  getPlaylistsAync,
  getMySavedTracksAsync,
} from "../../state/actions";
import { useDataLayerValue } from "../../state/DataLayer";

import MainLayoutPageWrapper from "../MainLayoutPageWrapper";
import TrackList from "../../components/TrackList";
import SectionHeading from "../../components/SectionHeading";

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
        {recentTracks && (
          <>
            <SectionHeading icon={RecentTracksIcon} title="Recently Played" />
            <TrackList items={recentTracks} />
          </>
        )}

        {savedTracks && (
          <>
            <SectionHeading icon={SavedTracksIcon} title="Saved Tracks" />
            <TrackList items={savedTracks} />
          </>
        )}

        {topTracks && (
          <>
            <SectionHeading icon={TopTracksIcon} title="Your Top Tracks" />
            <TrackList items={topTracks} />
          </>
        )}
      </div>
    </MainLayoutPageWrapper>
  );
}

export default Home;
