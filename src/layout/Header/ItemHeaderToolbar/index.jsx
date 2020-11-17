import React from "react";
import PlayCircleFilledIcon from "@material-ui/icons/PlayCircleFilledTwoTone";

import "./ItemHeaderToolbar.css";

function ItemHeaderToolbar({ title, onPlay }) {
  return (
    <div className="itemHeaderToolbar">
      <PlayCircleFilledIcon
        onClick={onPlay}
        className="itemHeaderToolbar__play"
      />
      <span className="itemHeaderToolbar__title">{title}</span>
    </div>
  );
}

export default ItemHeaderToolbar;
