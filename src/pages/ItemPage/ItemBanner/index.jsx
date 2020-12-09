import React from "react";

import Duration from "components/Duration";
import ImageFader from "components/ImageLoader";

import "./ItemBanner.css";

function ItemBanner({ item, variant, tracks }) {
  const trackCount = tracks.length;
  const totalPlayTime = tracks.reduce(
    (total, track) => total + track?.duration_ms,
    0
  );

  return (
    <div className="itemBanner">
      <div className="itemBanner__info">
        <ImageFader src={item?.images[0].url} alt={item?.name} />
        <div className="itemBanner__infoText">
          <strong>{variant}</strong>
          <h2>{item?.name}</h2>
          <p>
            {item?.owner && (
              <>
                by <span>{item.owner.display_name}</span> •{" "}
              </>
            )}
            <span className="itemBanner__infoText--tracks">
              {trackCount} track{trackCount > 1 ? "s" : ""},{" "}
              <Duration ms={totalPlayTime} variant />
            </span>{" "}
          </p>
          <p className="itemBanner__infoText--description">
            {item?.description}
          </p>
        </div>
      </div>
    </div>
  );
}

export default ItemBanner;
