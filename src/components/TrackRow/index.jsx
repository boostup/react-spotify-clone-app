import React from "react";

import Artists from "../Artists";
import Duration from "../Duration";
import ImageFader from "../ImageFader";

import "./TrackRow.css";

function TrackRow({ order, track, onPlay }) {
  return (
    <div className="trackRow" onClick={() => onPlay(track.id)}>
      <span className="trackRow__order">{order}</span>
      <ImageFader
        containerClass="trackRow__album"
        src={track.album.images[0].url}
      />
      <div className="trackRow__info">
        <span className="trackRow__info__duration">
          <Duration ms={track.duration_ms} />
        </span>{" "}
        <h1>{track.name}</h1>
        <p>
          {track.explicit && (
            <span title="Explicit" className="trackRow__explicit">
              e
            </span>
          )}
          <Artists items={track.artists} /> • {track.album.name}
        </p>
      </div>
    </div>
  );
}

export default TrackRow;
