import React, { useState } from "react";

import PlayCircleFilledIcon from "@material-ui/icons/PlayCircleFilledTwoTone";
import FavoriteIcon from "@material-ui/icons/Favorite";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import QueueIcon from "@material-ui/icons/Queue";

import ContextualMenu from "../ContextualMenu";

import "./PlaylistToolbar.css";

function PlaylistToolbar({ onQueue, onPlay }) {
  const menuOptions = [
    {
      icon: QueueIcon,
      title: "add first song to queue",
      fn: () => onQueue(),
    },
  ];

  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className="playlistToolbar">
      <PlayCircleFilledIcon
        onClick={onPlay}
        className="playlistToolbar__shuffle"
      />
      <FavoriteIcon className="playlistToolbar__favorite" fontSize="large" />
      <MoreHorizIcon className="playlistToolbar__more" onClick={handleClick} />
      <ContextualMenu
        menuId="playlist-toolbar-menu"
        menuOptions={menuOptions}
        anchorEl={anchorEl}
        onClose={handleClose}
      />
    </div>
  );
}

export default PlaylistToolbar;
