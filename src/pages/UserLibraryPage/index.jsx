import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { selectAuthToken } from "../../redux/auth/selectors";
import { selectUserLibraryPagePlaylists } from "../../redux/user-library-page/selectors";
import { getMyPlaylistsAync } from "../../redux/user-library-page/async-actions";

import MainLayoutPageWrapper from "../../layout/MainLayoutPageWrapper";
import PlaylistIcon from "@material-ui/icons/QueueMusic";
import SectionHeading from "../../components/SectionHeading";
import ItemsGrid from "../../components/ItemsGrid";

import "./UserLibraryPage.css";

function UserLibraryPage() {
  const dispatch = useDispatch();

  const { token } = useSelector(selectAuthToken);
  const playlists = useSelector(selectUserLibraryPagePlaylists);

  const { items } = playlists;

  useEffect(() => {
    getMyPlaylistsAync(dispatch);
  }, [dispatch, token]);

  return (
    <MainLayoutPageWrapper
      //
      title="Your Library"
      {...{ dispatch, useSelector }}
    >
      <div className="yourLibrary">
        <SectionHeading icon={PlaylistIcon} title="Your Playlists" />
        <ItemsGrid variant="playlist" items={items} />
      </div>
    </MainLayoutPageWrapper>
  );
}

export default UserLibraryPage;
