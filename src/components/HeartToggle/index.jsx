import React, { useState } from "react";

import FavoriteIcon from "@material-ui/icons/Favorite";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";

import "./HeartToggle.css";

function HeartToggle({ status = false, onToggle = () => { } }) {

  const [_status, _setStatus] = useState(status);

  const handleClick = (event) => {
    event.stopPropagation();
    onToggle();
    _setStatus(!_status);
  };

  return (
    <div className="heartToggle" onClick={handleClick}>
      {_status && <FavoriteIcon className="heartToggle__toggled" />}
      {!_status && <FavoriteBorderIcon className="heartToggle__untoggled" />}
    </div>
  );
}

export default HeartToggle;
