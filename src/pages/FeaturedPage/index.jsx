import React, { useEffect } from "react";

import RadioIcon from "@material-ui/icons/Radio";

import {
  getMyPlaylistsFeaturedAsync,
  getRecommendationsAsync,
  playTrack,
} from "../../state/actions";
import { useDataLayerValue } from "../../state/DataLayer";

import SectionHeading from "../../components/SectionHeading";
import MainLayoutPageWrapper from "../MainLayoutPageWrapper";
import TrackList from "../../components/TrackList";
import PlaylistsGrid from "../../components/PlaylistsGrid";

function FeaturedPage({
  match: {
    params: { trackId, trackName },
  },
}) {
  const { state, dispatch } = useDataLayerValue();
  const { token, recommendedTracks, playlistsFeatured } = state;

  useEffect(() => {
    // 1) get seed track title based on match.params.id
    // 2) getRecommendationsAsync(track.id, dispatch);
    getRecommendationsAsync(trackId, dispatch);
    // 3) get featured PLs => getMyPlaylistsFeaturedAsync
    getMyPlaylistsFeaturedAsync(dispatch);
  }, [dispatch, trackId, token]);

  return (
    <MainLayoutPageWrapper title="Radio + Featured Playlists">
      <div className="featuredPage">
        {recommendedTracks && (
          <>
            <SectionHeading
              icon={RadioIcon}
              title={`Radio based on '${trackName}'`}
            />
            <TrackList
              firstLarge={true}
              items={recommendedTracks}
              onPlay={(id) => playTrack(id)}
            />
          </>
        )}

        {playlistsFeatured && (
          <>
            <SectionHeading
              icon={RadioIcon}
              title={playlistsFeatured.message}
            />
            <PlaylistsGrid items={playlistsFeatured?.playlists?.items} />
          </>
        )}
      </div>
    </MainLayoutPageWrapper>
  );
}

export default FeaturedPage;
