import React from "react";

import { useDataLayerValue } from "../DataLayer";

import HomeIcon from "@material-ui/icons/Home";
import SearchIcon from "@material-ui/icons/Search";
import LibraryMusicIcon from "@material-ui/icons/LibraryMusic";

import SidebarOption from "../SidebarOption";

import "./Sidebar.css";

const SPOTIFY_LOGO = require("../../assets/spotify166x70.jpg")?.default;

function Sidebar() {
  const [{ playlists }, dispatch] = useDataLayerValue();

  return (
    <div className="sidebar">
      <img className="sidebar__logo" src={SPOTIFY_LOGO} alt="spotify logo" />
      <SidebarOption title="Home" Icon={HomeIcon} />
      <SidebarOption title="Search" Icon={SearchIcon} />
      <SidebarOption title="Your Library" Icon={LibraryMusicIcon} />
      <br />
      <strong className="sidebar__title">Playlists</strong>
      <hr />

      {/* NICE TRICK : I need to make tests with this in the context of Async values */}
      {playlists?.items?.map(({ name }) => (
        <SidebarOption title={name} />
      ))}
    </div>
  );
}

export default Sidebar;
