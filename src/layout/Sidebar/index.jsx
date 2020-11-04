import React from "react";

import { useDataLayerValue } from "../../components/DataLayer";

import HomeIcon from "@material-ui/icons/Home";
import SearchIcon from "@material-ui/icons/Search";
import LibraryMusicIcon from "@material-ui/icons/LibraryMusic";

import SidebarOption from "../../components/SidebarOption";

import "./Sidebar.css";

const SPOTIFY_LOGO = require("../../assets/spotifylogo.svg")?.default;

function Sidebar(props) {
  const { state } = useDataLayerValue();
  const { playlists } = state;

  return (
    <div {...props}>
      <img className="sidebar__logo" src={SPOTIFY_LOGO} alt="spotify logo" />
      <SidebarOption title="Home" Icon={HomeIcon} to="/" />
      <SidebarOption title="Search" Icon={SearchIcon} to="/search" />
      <SidebarOption
        title="Your Library"
        Icon={LibraryMusicIcon}
        to="/library"
      />
      <br />
      <strong className="sidebar__title">Playlists</strong>
      <hr />

      {/* NICE TRICK : I need to make tests with this in the context of Async values */}
      {playlists?.items?.map(({ id, name }) => (
        <SidebarOption key={id} title={name} to={`/playlist/${id}`} />
      ))}
    </div>
  );
}

export default Sidebar;
