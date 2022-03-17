import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { selectUserSavedTitlesPage } from "_redux/user-saved-titles-page/selectors";
import { fetchUserSavedTitlesDataStart } from "_redux/user-saved-titles-page/actions";

import FavoriteIcon from "@material-ui/icons/Favorite";

import MainLayoutPageWrapper from "layout/MainLayoutPageWrapper";
import SectionHeading from "components/SectionHeading";

import TrackList from "components/TrackList";

function UserSavedTitles() {
  const dispatch = useDispatch();
  const pageState = useSelector(selectUserSavedTitlesPage);
  const { savedTitles } = pageState;
  const tracks = savedTitles?.items || [];

  useEffect(() => {
    dispatch(fetchUserSavedTitlesDataStart());
  }, [dispatch]);

  return (
    <MainLayoutPageWrapper
      //
      title="Your Library"
      isLoading={pageState.isFetching}
    >
      <div className="yourLibrary">
        <SectionHeading icon={FavoriteIcon} title="Liked titles" />
        <TrackList firstLarge={false} items={tracks} />
      </div>
    </MainLayoutPageWrapper>
  );
}

export default UserSavedTitles;
