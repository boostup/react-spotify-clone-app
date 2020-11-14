import React, { memo } from "react";
import uuid from "uuid";

import TrackRow from "../TrackRow";

import "./TrackList.css";

function TrackList({ playlist, onPlay }) {
  return (
    <div className="trackList">
      {playlist?.tracks.items
        .filter((item) => item.is_local === false)
        .map(({ track }, i) => (
          <TrackRow
            //
            onPlay={onPlay}
            order={i + 1}
            key={uuid()}
            track={track}
          />
        ))}
    </div>
  );
}

function areEqual(prevProps, newProps) {
  //This is to avoid re-rendering the track items, which contain images that load with fade-in effects
  //Basically, when a dispatch is triggered, like those to control the state of the HEADER component (show/hide background, or show the miniPlaylistToolbar) , this component is being re-rendered needlessly, since the playlist tracks have not changed!
  //In the future, when tracks can be re-ordered, and a re-render is hence necessary, than this condition below should still be valid, because the stringified version of the tracks takes into account the order of the tracks in the objects.
  const prevString = JSON.stringify(prevProps.playlist?.tracks.items);
  const newString = JSON.stringify(newProps.playlist?.tracks.items);
  return prevString === newString;
}

export default memo(TrackList, areEqual);
