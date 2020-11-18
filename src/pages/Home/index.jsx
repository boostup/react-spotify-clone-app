import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { selectHomePage } from "../../redux/home-page/selectors";

import { fetchHomePageDataStart } from "../../redux/home-page/actions";

import MainLayoutPageWrapper from "../../layout/MainLayoutPageWrapper";
import TrackList from "../../components/TrackList";
import SectionHeading from "../../components/SectionHeading";

import SavedTracksIcon from "@material-ui/icons/Favorite";
import TopTracksIcon from "@material-ui/icons/Whatshot";
import RecentTracksIcon from "@material-ui/icons/TrendingUp";

import "./Home.css";

function Home() {
  const dispatch = useDispatch();
  const homePageState = useSelector(selectHomePage);
  const { savedTracks, topTracks, recentTracks } = homePageState;

  return (
    <MainLayoutPageWrapper
      //
      title="Home"
      isLoading={homePageState.isFetching}
      onDataRequest={fetchHomePageDataStart}
      {...{ dispatch, useSelector }}
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
