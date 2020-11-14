import React, { useState } from "react";

import PlayCircleFilledIcon from "@material-ui/icons/PlayCircleFilledTwoTone";
import FavoriteIcon from "@material-ui/icons/Favorite";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import ContextualMenu from "../ContextualMenu";

import "./PlaylistToolbar.css";

function PlaylistToolbar({ onPlay }) {
  const menuOptions = [
    {
      title: "add to queue (in construction 👷)",
      fn: () => {},
    },
    {
      title: "modify (in construction 🚧)",
      fn: () => {},
    },
    {
      title: "delete (in construction 🏗)",
      fn: () => {},
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
        menuId="avatar-menu"
        menuOptions={menuOptions}
        anchorEl={anchorEl}
        onClose={handleClose}
      />
    </div>
  );
}

export default PlaylistToolbar;
