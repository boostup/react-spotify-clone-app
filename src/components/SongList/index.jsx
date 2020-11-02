import React from "react";

import SongRow from "../SongRow";

import { useDataLayerValue } from "../DataLayer";

import "./SongList.css";

function SongList() {
  const { state } = useDataLayerValue();
  const { discoverWeekly } = state;

  return (
    <div className="songList">
      {discoverWeekly?.tracks.items.map(({ track }) => (
        <SongRow key={track.id} track={track} />
      ))}
    </div>
  );
}

export default SongList;
