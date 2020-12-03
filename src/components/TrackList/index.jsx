import React, { memo } from "react";
import uuid from "uuid";

import { playTrack } from "_redux/footer/async-actions";

import TrackRow from "../TrackRow";

import "./TrackList.css";
import { useDispatch } from "react-redux";

function TrackList({ items, onPlay, firstLarge = true }) {
  const dispatch = useDispatch();

  return (
    <div className={`trackList ${firstLarge ? "large" : ""}`}>
      {items
        .filter((item) => item?.is_local === false)
        .map((track, i) => (
          <TrackRow
            large={firstLarge && i === 0 ? true : false}
            //
            onPlay={(uri) => {
              playTrack(uri, dispatch);
            }}
            order={i + 1}
            key={uuid()}
            track={track}
          />
        ))}
    </div>
  );
}

function areEqual(prevProps, newProps) {
  //This is to avoid re-rendering needlessly this component, as it would then trigger each of the child track items to re-render as well.  Their fade-in image effect is quiet hard on the browser !
  //Basically, when a dispatch is triggered, like those to control the state of the HEADER component (show/hide background, or show the miniPlaylistToolbar) , this component is being re-rendered needlessly, since the playlist tracks have not changed!
  //In the future, when tracks will be re-orderable (drag-n-drop), and a re-render is hence necessary, than this condition below should still be valid, because the stringified version of the tracks takes into account the order of the tracks in the objects.
  const prevString = JSON.stringify(prevProps.items);
  const newString = JSON.stringify(newProps.items);
  return prevString === newString;
}

export default memo(TrackList, areEqual);
