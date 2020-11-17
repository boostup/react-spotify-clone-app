import React from "react";

import "./Footer.css";
import SpotifyRemoteControl from "./SpotifyRemoteControl";

function Footer({ className, dispatch, useSelector }) {
  return (
    <div className={className}>
      <SpotifyRemoteControl {...{ dispatch, useSelector }} />
    </div>
  );
}

export default Footer;
