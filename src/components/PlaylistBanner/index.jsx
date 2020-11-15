import React from "react";

import { useDataLayerValue } from "../../state/DataLayer";

import Duration from "../Duration";
import ImageFader from "../ImageFader";

import "./PlaylistBanner.css";

function PlaylistBanner() {
  const { state } = useDataLayerValue();
  const { playlist } = state;
  const trackCount = playlist?.tracks.items.length;
  const totalPlayTime = playlist?.tracks.items.reduce(
    (total, { track }) => total + track.duration_ms,
    0
  );

  return (
    <div className="playlistBanner">
      <div className="playlistBanner__info">
        <ImageFader src={playlist?.images[0].url} type="crossFade" />
        <div className="playlistBanner__infoText">
          <strong>Playlist</strong>
          <h2>{playlist?.name}</h2>
          <p>
            by <span>{playlist?.owner.display_name}</span> •{" "}
            <span className="playlistBanner__infoText--tracks">
              {trackCount} track{trackCount > 1 ? "s" : ""},{" "}
              <Duration ms={totalPlayTime} variant />
            </span>{" "}
          </p>
          <p className="playlistBanner__infoText--description">
            {playlist?.description}
          </p>
        </div>
      </div>
    </div>
  );
}

export default PlaylistBanner;
