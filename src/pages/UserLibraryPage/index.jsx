import React, { useEffect } from "react";

import { useDataLayerValue } from "../../state/DataLayer";
import { getPlaylistsAync } from "../../state/actions";

import MainLayoutPageWrapper from "../MainLayoutPageWrapper";
import PlaylistIcon from "@material-ui/icons/QueueMusic";
import SectionHeading from "../../components/SectionHeading";
import ItemsGrid from "../../components/ItemsGrid";

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
        <SectionHeading icon={PlaylistIcon} title="Your Playlists" />
        <ItemsGrid variant="playlist" items={items} />
      </div>
    </MainLayoutPageWrapper>
  );
}

export default UserLibraryPage;
