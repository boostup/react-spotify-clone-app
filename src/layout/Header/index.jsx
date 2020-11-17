import React from "react";

import { useDataLayerValue } from "../../state/DataLayer";
import { playItem } from "../../state/actions";

import SearchField from "./SearchField";
import MiniPlaylistToolBar from "./MiniPlaylistToolBar";
import AvatarArea from "./AvatarArea";

import "./Header.css";

function Header(props) {
  const { className } = props;
  const { state } = useDataLayerValue();
  const {
    user,
    displaySearchBar,
    isPlaylistPage,
    displayPlaylistToolbar,
    playlist,
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
        <MiniPlaylistToolBar
          title={playlist?.name}
          onPlay={() => playItem(playlist?.uri)}
        />
      </div>
      <div className="header__right">
        <AvatarArea user={user} />
      </div>
    </div>
  );
}

export default Header;
