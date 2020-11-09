import React from "react";

import "./Footer.css";
import SpotifyAudioPlayer from "../../components/SpotifyAudioPlayer";

function Footer(props) {
  return (
    <div {...props}>
      <SpotifyAudioPlayer />
    </div>
  );
}

export default Footer;
