import React, { useState } from "react";
import { Avatar } from "@material-ui/core";

import { avatarMenuOptions } from "../../../utils/constants";
import ContextualMenu from "../../../components/ContextualMenu";

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
        <Avatar src={user?.images[0]?.url} alt={user?.display_name} />
        <h4>{user?.display_name}</h4>
      </div>
      <ContextualMenu
        menuId="avatar-menu"
        menuOptions={avatarMenuOptions}
        anchorEl={anchorEl}
        onClose={handleClose}
      />
    </div>
  );
}

export default AvatarArea;
