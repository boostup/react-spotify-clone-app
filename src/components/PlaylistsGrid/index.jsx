import React from "react";
import { useHistory } from "react-router-dom";

import { playPlaylist } from "../../state/actions";

import ItemCover from "../ItemCover";

import "./PlaylistsGrid.css";

function PlaylistsGrid({ items }) {
  const history = useHistory();

  return (
    <div className="playlistsGrid">
      {items?.map((playlist) => (
        <ItemCover
          key={playlist.id}
          item={playlist}
          onGoTo={() => history.push(`/playlist/${playlist.id}`)}
          onPlay={() => playPlaylist(playlist.id)}
        />
      ))}
    </div>
  );
}

export default PlaylistsGrid;
