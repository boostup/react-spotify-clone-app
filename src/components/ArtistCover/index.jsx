import React from "react";

import { ReactComponent as ArtistPlaceholderImage } from "../../assets/artist.placeholder.svg";
import ImageFader from "../ImageFader";

import "./ArtistCover.css";

function ArtistCover({ item, onClick }) {
  const { images, name } = item;

  const image = images ? images[0]?.url : "";

  return (
    <div className="artistCover" onClick={onClick}>
      {image ? (
        <ImageFader src={image} alt={name} />
      ) : (
        <ArtistPlaceholderImage title={name} />
      )}

      <div className="artistCover__name">{name}</div>
    </div>
  );
}

export default ArtistCover;
