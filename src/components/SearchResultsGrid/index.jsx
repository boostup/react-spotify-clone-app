import React from "react";
import { useHistory } from "react-router-dom";

import ArtistCover from "../ArtistCover";
import ItemCover from "../ItemCover";

import "./SearchResultsGrid.css";

function SearchResultsGrid({ itemTypes, itemType, items }) {
  const history = useHistory();

  return (
    <div className="searchResultsGrid">
      {items?.map((item) =>
        itemType === itemTypes.artist ? (
          <ArtistCover key={item.id} item={item} />
        ) : (
          <ItemCover
            key={item.id}
            item={item}
            onClick={() => history.push(`/playlist/${item.id}`)}
          />
        )
      )}
    </div>
  );
}

export default SearchResultsGrid;
