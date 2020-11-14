import React from "react";
import PlayCircleFilledIcon from "@material-ui/icons/PlayCircleFilledTwoTone";

import "./MiniPlaylistToolbar.css";

function MiniPlaylistToolBar({ title, onPlay }) {
  return (
    <div className="miniPlaylistToolbar">
      <PlayCircleFilledIcon
        onClick={onPlay}
        className="miniPlaylistToolbar__play"
      />
      <span className="miniPlaylistToolbar__title">{title}</span>
    </div>
  );
}

export default MiniPlaylistToolBar;
