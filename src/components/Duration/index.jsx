import React from "react";
import { convertMiliseconds } from "../../utils/time";

function Duration({ ms, variant }) {
  const duration = convertMiliseconds(ms);

  let daySeparator = ":",
    hourSeparator = ":",
    minSeparator = ":",
    secSeparator = "";

  if (variant) {
    daySeparator = "d ";
    hourSeparator = "h ";
    minSeparator = "min ";
    secSeparator = "sec ";
  }

  return (
    <span>
      {duration.d ? `${duration.d}${daySeparator}` : null}
      {duration.h ? `${duration.h}${hourSeparator}` : null}
      {duration.m < 10 ? "0" : ""}
      {duration.m ? `${duration.m}${minSeparator}` : null}
      {duration.s < 10 ? "0" : ""}
      {duration.s ? `${duration.s}${secSeparator}` : null}
    </span>
  );
}

export default Duration;
