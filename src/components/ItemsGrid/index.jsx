import React from "react";
import { useHistory } from "react-router-dom";

import { playItem } from "../../state/actions";
import ItemCover from "../ItemCover";

import "./ItemsGrid.css";

function ItemsGrid({ items, variant }) {
  const history = useHistory();

  return (
    <div className={`itemsGrid ${variant}`}>
      {items?.map((item) => (
        <ItemCover
          key={item.id}
          item={item}
          displayPlayButton={variant === "artist" ? false : true}
          onGoTo={() =>
            variant === "artist"
              ? window.open(item.external_urls.spotify, "_blank")
              : history.push(`/${variant}/${item.id}`)
          }
          onPlay={() => playItem(item.uri)}
        />
      ))}
    </div>
  );
}

export default ItemsGrid;
