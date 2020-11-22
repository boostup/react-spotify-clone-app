import React from "react";

import SpotifyAnimatedWrapper from "./SpotifyAnimatedWrapper";
import { ReactComponent as AnimatedLogo } from "assets/spotifyAnimatedLogo.svg";
import { ReactComponent as AnimatedName } from "assets/spotifyAnimatedName.svg";

import "./SpotifyAnimated.css";

function SpotifyAnimated({ logo, name }) {
  return (
    <SpotifyAnimatedWrapper {...{ logo, name }}>
      {logo && <AnimatedLogo />}
      {name && <AnimatedName />}
    </SpotifyAnimatedWrapper>
  );
}

export default SpotifyAnimated;
