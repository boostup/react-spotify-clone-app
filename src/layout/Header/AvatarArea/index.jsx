import React, { useState } from "react";
import { Avatar } from "@material-ui/core";

import ContextualMenu from "components/ContextualMenu";

import "./AvatarArea.css";

function AvatarArea({ userAvatar, userName, menuOptions }) {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className="avatarArea">
      <div className="avatarArea__clicker" onClick={handleClick}>
        <Avatar src={userAvatar} alt={userName} />
        <h4>{userName}</h4>
      </div>
      <ContextualMenu
        menuId="avatar-menu"
        menuOptions={menuOptions}
        anchorEl={anchorEl}
        onClose={handleClose}
      />
    </div>
  );
}

export default AvatarArea;
