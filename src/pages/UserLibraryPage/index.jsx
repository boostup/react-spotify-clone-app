import React from "react";

import MainLayoutPageWrapper from "../MainLayoutPageWrapper";
import { useDataLayerValue } from "../../state/DataLayer";
import PlaylistsGrid from "../../components/PlaylistsGrid";

import "./UserLibraryPage.css";

function UserLibraryPage() {
  const { state } = useDataLayerValue();
  const { playlists } = state;
  const { items } = playlists;

  return (
    <MainLayoutPageWrapper title="Your Library">
      <div className="yourLibrary">
        <h1>Your Playlists</h1>
        <PlaylistsGrid items={items} />
      </div>
    </MainLayoutPageWrapper>
  );
}

export default UserLibraryPage;
