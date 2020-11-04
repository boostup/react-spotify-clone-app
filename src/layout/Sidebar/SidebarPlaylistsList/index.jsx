import React from "react";

import SidebarOption from "../SidebarOption";

import "./SidebarPlaylistsList.css";

function SidebarPlaylistsList({ playlists }) {
  return (
    <div className="sidebarPlaylistsList">
      <br />
      <strong className="sidebar__title">Playlists</strong>
      <hr />
      {playlists?.items?.map(({ id, name }) => (
        <SidebarOption key={id} title={name} to={`/playlist/${id}`} />
      ))}
    </div>
  );
}

export default SidebarPlaylistsList;
