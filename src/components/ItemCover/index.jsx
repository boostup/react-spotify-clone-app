import React from "react";

import "./ItemCover.css";

function ItemCover({ item, onClick }) {
  const { images, name, owner } = item;

  return (
    <div className="itemCover" onClick={onClick}>
      <img src={images[0].url} alt="spotify playlist cover" />
      <div className="itemCover__name">{name}</div>
      <div className="itemCover__owner">by {owner.display_name}</div>
    </div>
  );
}

export default ItemCover;
