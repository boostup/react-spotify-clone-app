import React from "react";

import SongRow from "../SongRow";

import { useDataLayerValue } from "../DataLayer";

import "./SongList.css";

function SongList() {
  const { state } = useDataLayerValue();
  const { playlist } = state;

  return (
    <div className="songList">
      {playlist?.tracks.items.map(({ track }) => (
        <SongRow key={track.id} track={track} />
      ))}
    </div>
  );
}

export default SongList;
