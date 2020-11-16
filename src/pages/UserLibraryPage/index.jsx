import React, { useEffect } from "react";

import { useDataLayerValue } from "../../state/DataLayer";
import { getPlaylistsAync } from "../../state/actions";

import MainLayoutPageWrapper from "../MainLayoutPageWrapper";
import PlaylistsGrid from "../../components/PlaylistsGrid";
import PlaylistIcon from "@material-ui/icons/QueueMusic";

import "./UserLibraryPage.css";

function UserLibraryPage() {
  const { state, dispatch } = useDataLayerValue();
  const { playlists, token } = state;
  const { items } = playlists;

  useEffect(() => {
    getPlaylistsAync(dispatch);
  }, [dispatch, token]);

  return (
    <MainLayoutPageWrapper title="Your Library">
      <div className="yourLibrary">
        <h1>
          <PlaylistIcon className="mainLayout__icon" />
          Your Playlists
        </h1>
        <PlaylistsGrid items={items} />
      </div>
    </MainLayoutPageWrapper>
  );
}

export default UserLibraryPage;
