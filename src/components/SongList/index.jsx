import React from "react";

import SongRow from "../SongRow";

import { useDataLayerValue } from "../DataLayer";

import "./SongList.css";

function SongList() {
  const [{ discoverWeekly }, dispatch] = useDataLayerValue();
  return (
    <div className="songList">
      {discoverWeekly?.tracks.items.map(({ track }) => (
        <SongRow track={track} />
      ))}
    </div>
  );
}

export default SongList;
