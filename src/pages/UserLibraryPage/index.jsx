import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { selectUserLibraryPage } from "_redux/user-library-page/selectors";
import { fetchUserLibraryPageDataStart } from "_redux/user-library-page/actions";

import PlaylistIcon from "@material-ui/icons/QueueMusic";
import AlbumIcon from "@material-ui/icons/Album";

import MainLayoutPageWrapper from "layout/MainLayoutPageWrapper";
import SectionHeading from "components/SectionHeading";
import ItemsGrid from "components/ItemsGrid";

import "./UserLibraryPage.css";

function UserLibraryPage() {
  const dispatch = useDispatch();
  const pageState = useSelector(selectUserLibraryPage);
  const { myPlaylists, myAlbums } = pageState;

  useEffect(() => {
    dispatch(fetchUserLibraryPageDataStart());
  }, [dispatch]);

  return (
    <MainLayoutPageWrapper
      //
      title="Your Library"
      isLoading={pageState.isFetching}
    >
      <div className="yourLibrary content">
        <SectionHeading icon={PlaylistIcon} title="Your Playlists" />
        <ItemsGrid variant="playlist" items={myPlaylists.items} />

        <SectionHeading icon={AlbumIcon} title="Your Saved Albums" />
        <ItemsGrid variant="album" items={myAlbums.items} />
      </div>
    </MainLayoutPageWrapper>
  );
}

export default UserLibraryPage;
