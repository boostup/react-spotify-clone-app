import React, { useEffect } from "react";

import { useDataLayerValue } from "../../state/DataLayer";
import {
  getPlaylistAsync,
  playPlaylist,
  playTrack,
  toggleIsPlaylistPage,
  toggleDisplayPlaylistToolbar,
  addToQueue,
  // isPlaylistFollowedByUser,
} from "../../state/actions";

import MainLayoutPageWrapper from "../MainLayoutPageWrapper";
import PlaylistBanner from "../../components/PlaylistBanner";
import PlaylistToolbar from "../../components/PlaylistToolbar";
import TrackList from "../../components/TrackList";

import "./PlaylistPage.css";

function PlaylistPage({
  match: {
    params: { id },
  },
}) {
  const { state, dispatch } = useDataLayerValue();
  const {
    // user,
    token,
    playlist,
  } = state;

  const pageTitle = playlist?.name;
  const tracks = playlist?.tracks.items.map((item) => item.track) || [];
  // const userId = user?.id;
  // const isPlaylistOwner = playlist?.owner.id === userId;

  // console.log(userId, id, isPlaylistOwner);

  useEffect(() => {
    dispatch(toggleIsPlaylistPage(true));
    getPlaylistAsync(id, dispatch);
    // userId &&
    //   !isPlaylistOwner &&
    //   isPlaylistFollowedByUser({ playlistId: id, userId }, dispatch);

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
        {/* <p>
          {id} * {playlist?.owner.id} * {userId}
        </p> */}
        <PlaylistToolbar
          // isOwner={isPlaylistOwner}
          // isPlaylistFollower={}
          // toggleFollowPlayist={}
          onQueue={() => addToQueue(tracks[0].uri)}
          onPlay={() => playPlaylist(playlist.id)}
        />
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
