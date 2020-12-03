import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { selectHomePage } from "_redux/home-page/selectors";

import { fetchHomePageDataStart } from "_redux/home-page/actions";

import MainLayoutPageWrapper from "layout/MainLayoutPageWrapper";
import TrackList from "components/TrackList";
import SectionHeading from "components/SectionHeading";

import SavedTracksIcon from "@material-ui/icons/Favorite";
import TopTracksIcon from "@material-ui/icons/Whatshot";
import RecentTracksIcon from "@material-ui/icons/TrendingUp";

import "./Home.css";
import { selectAuth } from "_redux/auth/selectors";

function Home() {
  const dispatch = useDispatch();
  const authState = useSelector(selectAuth);
  const pageState = useSelector(selectHomePage);
  const { savedTracks, topTracks, recentTracks } = pageState;

  useEffect(() => {
    if (authState.success === true) {
      dispatch(fetchHomePageDataStart());
    }
  }, [dispatch, authState.success]);

  return (
    <MainLayoutPageWrapper
      //
      title="Home"
      isLoading={pageState.isFetching}
    >
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
