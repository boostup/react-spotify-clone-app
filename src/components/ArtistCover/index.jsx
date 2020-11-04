import React from "react";

import { ReactComponent as ArtistPlaceholderImage } from "../../assets/artist.placeholder.svg";

import "./ArtistCover.css";

function ArtistCover({ item, onClick }) {
  const { images, name } = item;

  const image = images ? images[0]?.url : "";

  return (
    <div className="artistCover" onClick={onClick}>
      {image ? (
        <img src={image} alt="spotify playlist cover" />
      ) : (
        <ArtistPlaceholderImage />
      )}

      <div className="artistCover__name">{name}</div>
    </div>
  );
}

export default ArtistCover;
