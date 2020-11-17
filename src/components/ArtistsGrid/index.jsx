import React from "react";
// import { useHistory } from "react-router-dom";

import ArtistCover from "../ArtistCover";

import "./ArtistsGrid.css";

function ArtistsGrid({ items }) {
  // const history = useHistory();

  return (
    <div className="artistsGrid">
      {items?.map((item) => (
        <ArtistCover
          key={item.id}
          item={item}
          href={item.external_urls.spotify}
        />
      ))}
    </div>
  );
}

export default ArtistsGrid;
