import React from "react";
import Artists from "../../Artists";

function TrackPanel({ shouldDisplay, image, title, artists, album }) {
  return (
    <>
      {shouldDisplay ? (
        <>
          <img
            className="spotifyAudioPlayer__albumLogo"
            src={image}
            alt={`${title} - ${album}`}
            title={`${title} - ${album}`}
          />
          <div className="spotifyAudioPlayer__songInfo">
            <h4>{title}</h4>
            <Artists items={artists} />
          </div>
        </>
      ) : null}
    </>
  );
}

export default TrackPanel;
