import React from "react";
import PlayIcon from "@material-ui/icons/PlayCircleFilledSharp";

import Artists from "../Artists";
import ImageFader from "../ImageFader";
import { ReactComponent as ArtistPlaceholderImage } from "../../assets/artist.placeholder.svg";

import "./ItemCover.css";

/**
 * Is understood by Item :
 *  Album, Artist or Playlist
 *
 * The values for `variant` are :
 *   "album", "artist", "playlist"
 *
 * Same applies for ItemsGrid, ItemBanner, TrackList
 */
function ItemCover({ item, displayPlayButton, onGoTo, onPlay }) {
  const { images, name, owner, artists } = item;

  const image = images ? images[0]?.url : "";

  return (
    <div className="itemCover" onClick={onGoTo}>
      <div className="itemCover__cover">
        {displayPlayButton && (
          <button
            className="itemCover__play"
            onClick={(event) => {
              onPlay();
              event.stopPropagation();
            }}
          >
            <PlayIcon />
          </button>
        )}

        {image ? (
          <ImageFader src={image} alt={name} />
        ) : (
          // Artists are the only items for which no image is guaranteed => if `image` is `null`, it is an artist
          <ArtistPlaceholderImage title={name} />
        )}
      </div>
      <div className="itemCover__name">{name}</div>

      {owner && <div className="itemCover__owner">by {owner.display_name}</div>}

      {artists && <Artists items={artists} />}
    </div>
  );
}

export default ItemCover;
