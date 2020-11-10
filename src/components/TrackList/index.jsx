import React from "react";
import uuid from "uuid";

import TrackRow from "../TrackRow";

import { useDataLayerValue } from "../../state/DataLayer";

import "./TrackList.css";

function TrackList({ onPlay }) {
  const { state } = useDataLayerValue();
  const { playlist } = state;

  return (
    <div className="trackList">
      {playlist?.tracks.items
        .filter((item) => item.is_local === false)
        .map(({ track }, i) => {
          console.log(arguments);
          return (
            <TrackRow
              onPlay={onPlay}
              order={i + 1}
              key={uuid()}
              track={track}
            />
          );
        })}
    </div>
  );
}

export default TrackList;
