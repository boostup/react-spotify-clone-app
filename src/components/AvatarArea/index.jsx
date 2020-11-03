import React, { useState } from "react";

import { Avatar } from "@material-ui/core";
import AvatarMenu from "../AvatarMenu";

import "./AvatarArea.css";

function AvatarArea({ user }) {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className="avatarArea">
      <div className="avatarArea__clicker" onClick={handleClick}>
        {/* NICE TRICK : again-> optional chaining using `?` -> if object is still null when trying to access its properties, at least there won't be a JS error */}
        <Avatar src={user?.images[0]?.url} alt={user?.display_name} />
        <h4>{user?.display_name}</h4>
      </div>
      <AvatarMenu anchorEl={anchorEl} onClose={handleClose} />
    </div>
  );
}

export default AvatarArea;
