import React from "react";

import PlayCircleFilledIcon from "@material-ui/icons/PlayCircleFilledTwoTone";
import HeartToggle from "components/HeartToggle";

import "./ItemToolbar.css";

function ItemToolbar({
  displayHeart,
  heartStatus,
  onHeartToggleClick,
  onPlay,
}) {

  return (
    <div className="itemToolbar">
      <PlayCircleFilledIcon onClick={onPlay} className="itemToolbar__shuffle" />

      {!displayHeart && (
        <HeartToggle
          status={heartStatus}
          onToggle={onHeartToggleClick}
        />
      )}

    </div>
  );
}

export default ItemToolbar;
