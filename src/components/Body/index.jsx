import React from "react";

import { useDataLayerValue } from "../DataLayer";

import Header from "../Header";
import SongRow from "../SongRow";

import PlayCircleFilledIcon from "@material-ui/icons/PlayCircleFilled";
import FavoriteIcon from "@material-ui/icons/Favorite";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";

import "./Body.css";

function Body() {
  const [{ discoverWeekly }, dispatch] = useDataLayerValue();

  return (
    <div className="body">
      <Header />

      <div className="body__info">
        <img src={discoverWeekly?.images[0].url} alt="" />
        <div className="body__infoText">
          <strong>Playlist</strong>
          {/* <h2>{discoverWeekly?.name}</h2> */}
          <h2>Discover Weekly</h2>
          <p>{discoverWeekly?.description}</p>
        </div>
      </div>

      <div className="body__songs">
        <div className="body__icons">
          <PlayCircleFilledIcon className="body__shuffle" />
          <FavoriteIcon fontSize="large" />
          <MoreHorizIcon />
        </div>

        <div>
          {discoverWeekly?.tracks.items.map(({ track }) => (
            <SongRow track={track} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Body;
