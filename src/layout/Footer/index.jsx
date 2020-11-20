import React from "react";

import "./Footer.css";
import SpotifyRemoteControl from "./SpotifyRemoteControl";

function Footer({ className }) {
  return (
    <div className={className}>
      <SpotifyRemoteControl />
    </div>
  );
}

export default Footer;
