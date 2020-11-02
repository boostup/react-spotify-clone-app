import React from "react";

import Header from "../Header";
import PlaylistBanner from "../PlaylistBanner";
import PlaylistToolbar from "../PlaylistToolbar";
import SongList from "../SongList";

import "./PlaylistPage.css";

function PlaylistPage() {
  return (
    <div className="playlistPage">
      <Header />
      <PlaylistBanner />
      <PlaylistToolbar />
      <SongList />
    </div>
  );
}

export default PlaylistPage;
