import React from "react";

import { ReactComponent as ArtistPlaceholderImage } from "../../assets/artist.placeholder.svg";
import ImageFader from "../ImageFader";

import "./ArtistCover.css";

function ArtistCover({ item, href }) {
  const { images, name } = item;

  const image = images ? images[0]?.url : "";

  return (
    <div className="artistCover">
      <a href={href} target="_blank" rel="noreferrer">
        {image ? (
          <ImageFader src={image} alt={name} />
        ) : (
          <ArtistPlaceholderImage title={name} />
        )}
      </a>

      <div className="artistCover__name">{name}</div>
    </div>
  );
}

export default ArtistCover;
