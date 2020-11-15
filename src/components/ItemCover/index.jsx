import React from "react";
import PlayIcon from "@material-ui/icons/PlayCircleFilledSharp";
import Artists from "../Artists";

import "./ItemCover.css";

function ItemCover({ item, onClick }) {
  const { images, name, owner, artists } = item;

  return (
    <div className="itemCover" onClick={onClick}>
      <div className="itemCover__cover">
        <PlayIcon className="itemCover__play" />
        <img src={images[0].url} alt="spotify playlist cover" />
      </div>
      <div className="itemCover__name">{name}</div>

      {owner && <div className="itemCover__owner">by {owner.display_name}</div>}

      {artists && <Artists items={artists} />}
    </div>
  );
}

export default ItemCover;
