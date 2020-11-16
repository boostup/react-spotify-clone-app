import React from "react";

import FavoriteIcon from "@material-ui/icons/Favorite";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";

import "./HeartToggle.css";

function HeartToggle({ status, onToggle }) {
  const handleClick = (event) => {
    event.stopPropagation();
    onToggle();
  };

  return (
    <div className="heartToggle" onClick={handleClick}>
      {status && <FavoriteIcon className="heartToggle__toggled" />}
      {!status && <FavoriteBorderIcon className="heartToggle__untoggled" />}
    </div>
  );
}

export default HeartToggle;
