import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { selectUserLibraryPage } from "../../redux/user-library-page/selectors";
import { fetchUserLibraryPageDataStart } from "../../redux/user-library-page/actions";

import MainLayoutPageWrapper from "../../layout/MainLayoutPageWrapper";
import PlaylistIcon from "@material-ui/icons/QueueMusic";
import SectionHeading from "../../components/SectionHeading";
import ItemsGrid from "../../components/ItemsGrid";

import "./UserLibraryPage.css";

function UserLibraryPage() {
  const dispatch = useDispatch();
  const pageState = useSelector(selectUserLibraryPage);
  const { myPlaylists } = pageState;
  const { items } = myPlaylists;

  useEffect(() => {
    dispatch(fetchUserLibraryPageDataStart());
  }, [dispatch]);

  return (
    <MainLayoutPageWrapper
      //
      title="Your Library"
      sLoading={pageState.isFetching}
    >
      <div className="yourLibrary">
        <SectionHeading icon={PlaylistIcon} title="Your Playlists" />
        <ItemsGrid variant="playlist" items={items} />
      </div>
    </MainLayoutPageWrapper>
  );
}

export default UserLibraryPage;
