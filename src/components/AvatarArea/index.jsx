import { Avatar } from "@material-ui/core";
import React from "react";

import "./AvatarArea.css";

function AvatarArea({ user }) {
  return (
    <div className="avatarArea">
      {/* NICE TRICK : again-> optional chaining using `?` -> if object is still null when trying to access its properties, at least there won't be a JS error */}
      <Avatar src={user?.images[0]?.url} alt={user?.display_name} />
      <h4>{user?.display_name}</h4>
    </div>
  );
}

export default AvatarArea;
