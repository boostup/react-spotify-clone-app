import React from "react";

import { useDataLayerValue } from "../DataLayer";

import "./PlaylistBanner.css";

function PlaylistBanner() {
  const { state } = useDataLayerValue();
  const { discoverWeekly } = state;

  return (
    <div className="playlistBanner">
      <div className="playlistBanner__info">
        <img src={discoverWeekly?.images[0].url} alt="" />
        <div className="playlistBanner__infoText">
          <strong>Playlist</strong>
          <h2>{discoverWeekly?.name}</h2>
          <p>{discoverWeekly?.description}</p>
        </div>
      </div>
    </div>
  );
}

export default PlaylistBanner;
