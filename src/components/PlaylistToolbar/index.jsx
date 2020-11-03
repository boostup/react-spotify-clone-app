import React from "react";

import PlayCircleFilledIcon from "@material-ui/icons/PlayCircleFilled";
import FavoriteIcon from "@material-ui/icons/Favorite";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";

import "./PlaylistToolbar.css";

function PlaylistToolbar() {
  return (
    <div className="playlistToolbar">
      <PlayCircleFilledIcon className="playlistToolbar__shuffle" />
      <FavoriteIcon fontSize="large" />
      <MoreHorizIcon />
    </div>
  );
}

export default PlaylistToolbar;
