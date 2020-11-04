import React from "react";

import { convertMiliseconds } from "../../utils/time";

import "./TrackRow.css";

function TrackRow({ track }) {
  const duration = convertMiliseconds(track.duration_ms);

  return (
    <div className="trackRow">
      <img
        className="trackRow__album"
        src={track.album.images[0].url}
        alt={track.album.name}
      />
      <div className="trackRow__info">
        <span className="trackRow__info__duration">
          {duration.h ? `${duration.h}:` : null}
          {duration.m ? `${duration.m}:` : null}
          {duration.s ? `${duration.s}` : null}
        </span>{" "}
        <h1>{track.name}</h1>
        <p>
          {track.explicit && (
            <span title="Explicit" className="trackRow__explicit">
              e
            </span>
          )}
          {track.artists.map((artist) => artist.name).join(", ")} -{" "}
          {track.album.name}
        </p>
      </div>
    </div>
  );
}

export default TrackRow;
