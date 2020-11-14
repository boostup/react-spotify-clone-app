import React from "react";

import { useDataLayerValue } from "../../state/DataLayer";

import SearchField from "./SearchField";
import AvatarArea from "./AvatarArea";

import "./Header.css";

function PlaylistHeaderToolBar() {
  return (
    <div className="miniPlaylistToolbar">
      <button>PLAY</button> | playlist title here
    </div>
  );
}

function Header(props) {
  const { className } = props;
  const { state } = useDataLayerValue();
  const {
    user,
    displaySearchBar,
    isPlaylistPage,
    displayPlaylistToolbar,
  } = state;

  const searchBarClassName = () =>
    displaySearchBar ? "showSearchbar" : "hideSearchbar";

  const playlistToolbarClassName = () =>
    isPlaylistPage && displayPlaylistToolbar
      ? "showPlToolbar"
      : "hidePlToolbar";

  return (
    <div className={`${className}`}>
      <div
        className={`header__left ${searchBarClassName()} ${playlistToolbarClassName()} `}
      >
        <SearchField />
        <PlaylistHeaderToolBar />
      </div>
      <div className="header__right">
        <AvatarArea user={user} />
      </div>
    </div>
  );
}

export default Header;
