import React from "react";

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
            <p>{artists}</p>
          </div>
        </>
      ) : null}
    </>
  );
}

export default TrackPanel;
