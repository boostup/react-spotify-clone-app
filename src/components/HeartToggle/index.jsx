import React, { useState } from "react";

import FavoriteIcon from "@material-ui/icons/Favorite";

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
      <FavoriteIcon className={_status ? "heartToggle__toggled" : "heartToggle__untoggled"} />
    </div>
  );
}

export default HeartToggle;
