import React from "react";

import { useDataLayerValue } from "../../state/DataLayer";

import HomeIcon from "@material-ui/icons/Home";
import SearchIcon from "@material-ui/icons/Search";
import LibraryMusicIcon from "@material-ui/icons/LibraryMusic";

import SidebarOption from "./SidebarOption";

import "./Sidebar.css";
import SidebarPlaylistsList from "./SidebarPlaylistsList";

import { ReactComponent as Logo } from "../../assets/spotifLylogo.svg";

function Sidebar(props) {
  const { state } = useDataLayerValue();
  const { playlists } = state;

  return (
    <div {...props}>
      <Logo />
      <SidebarOption title="Home" Icon={HomeIcon} to="/" />
      <SidebarOption title="Search" Icon={SearchIcon} to="/search" />
      <SidebarOption
        title="Your Library"
        Icon={LibraryMusicIcon}
        to="/library"
      />

      <SidebarPlaylistsList playlists={playlists} />
    </div>
  );
}

export default Sidebar;
