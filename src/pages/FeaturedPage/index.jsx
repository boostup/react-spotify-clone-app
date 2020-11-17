import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import RadioIcon from "@material-ui/icons/Radio";

import { selectAuthToken } from "../../redux/auth/selectors";
import { selectFeaturedPage } from "../../redux/featured-page/selectors";
import {
  getMyPlaylistsFeaturedAsync,
  getRecommendationsAsync,
} from "../../redux/featured-page/async-actions";

import SectionHeading from "../../components/SectionHeading";
import MainLayoutPageWrapper from "../../layout/MainLayoutPageWrapper";
import TrackList from "../../components/TrackList";
import ItemsGrid from "../../components/ItemsGrid";

function FeaturedPage({
  match: {
    params: { trackId, trackName },
  },
}) {
  const dispatch = useDispatch();

  const { token } = useSelector(selectAuthToken);
  const { recommendedTracks, playlistsFeatured } = useSelector(
    selectFeaturedPage
  );

  useEffect(() => {
    // 1) get seed track title based on match.params.id
    // 2) getRecommendationsAsync(track.id, dispatch);
    getRecommendationsAsync(trackId, dispatch);
    // 3) get featured PLs => getMyPlaylistsFeaturedAsync
    getMyPlaylistsFeaturedAsync(dispatch);
  }, [dispatch, trackId, token]);

  return (
    <MainLayoutPageWrapper
      //
      title="Radio + Featured Playlists"
      {...{ dispatch, useSelector }}
    >
      <div className="featuredPage">
        {recommendedTracks && (
          <>
            <SectionHeading
              icon={RadioIcon}
              title={`Radio based on '${trackName}'`}
            />
            <TrackList firstLarge={true} items={recommendedTracks} />
          </>
        )}

        {playlistsFeatured && (
          <>
            <SectionHeading
              icon={RadioIcon}
              title={playlistsFeatured.message}
            />
            <ItemsGrid
              variant="playlist"
              items={playlistsFeatured?.playlists?.items}
            />
          </>
        )}
      </div>
    </MainLayoutPageWrapper>
  );
}

export default FeaturedPage;
