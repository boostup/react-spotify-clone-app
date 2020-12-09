import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import RadioIcon from "@material-ui/icons/Radio";

import { selectFeaturedPage } from "_redux/featured-page/selectors";
import { fetchFeaturedPageDataStart } from "_redux/featured-page/actions";

import SectionHeading from "components/SectionHeading";
import MainLayoutPageWrapper from "layout/MainLayoutPageWrapper";
import TrackList from "components/TrackList";
import ItemsGrid from "components/ItemsGrid";

import "./FeaturedPage.css"

function FeaturedPage() {
  let { trackId, trackName } = useParams();
  const dispatch = useDispatch();
  const pageState = useSelector(selectFeaturedPage);
  const { recommendedTracks } = useSelector(
    selectFeaturedPage
  );

  useEffect(() => {
    dispatch(fetchFeaturedPageDataStart(trackId));
  }, [dispatch, trackId]);

  return (
    <MainLayoutPageWrapper
      //
      title="Radio + Featured Playlists"
      isLoading={pageState.isFetching}
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

      </div>
    </MainLayoutPageWrapper>
  );
}

export default FeaturedPage;
