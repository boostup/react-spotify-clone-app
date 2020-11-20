import React, { useState } from "react";

import PlayCircleFilledIcon from "@material-ui/icons/PlayCircleFilledTwoTone";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import QueueIcon from "@material-ui/icons/Queue";

import ContextualMenu from "../ContextualMenu";
import HeartToggle from "../HeartToggle";

import "./ItemToolbar.css";

function ItemToolbar({
  displayHeart,
  // isPlaylistFollower,
  // toggleFollowPlaylist,
  onQueue,
  onPlay,
}) {
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
    <div className="itemToolbar">
      <PlayCircleFilledIcon onClick={onPlay} className="itemToolbar__shuffle" />

      {!displayHeart && (
        <HeartToggle
          // status={false}
          onToggle={() => console.log("toggled!!!!!!!!!!!!!!!!!!!!!")}
        />
      )}

      <MoreHorizIcon className="itemToolbar__more" onClick={handleClick} />
      <ContextualMenu
        menuId="item-toolbar-menu"
        menuOptions={menuOptions}
        anchorEl={anchorEl}
        onClose={handleClose}
      />
    </div>
  );
}

export default ItemToolbar;
