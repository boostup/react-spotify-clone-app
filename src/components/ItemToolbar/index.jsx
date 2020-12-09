import React, { useState } from "react";

import PlayCircleFilledIcon from "@material-ui/icons/PlayCircleFilledTwoTone";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import EditIcon from "@material-ui/icons/Edit";

import ContextualMenu from "../ContextualMenu";
import HeartToggle from "../HeartToggle";

import "./ItemToolbar.css";

function ItemToolbar({
  displayHeart,
  heartStatus,
  onHeartToggleClick,
  onPlay,
}) {
  const menuOptions = [
    {
      icon: EditIcon,
      title: "edit playlist (under construction 👷)",
      fn: () => { },
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
          status={heartStatus}
          onToggle={onHeartToggleClick}
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
