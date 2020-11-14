import React from "react";

import { convertMiliseconds } from "../../utils/time";
import ImageFader from "../ImageFader";

import "./TrackRow.css";

function TrackRow({ order, track, onPlay }) {
  const duration = convertMiliseconds(track.duration_ms);

  return (
    <div className="trackRow" onClick={() => onPlay(track.id)}>
      <span className="trackRow__order">{order}</span>
      <ImageFader
        containerClass="trackRow__album"
        src={track.album.images[0].url}
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
