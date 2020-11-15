import React from "react";

function Artists({ items }) {
  const artists = items
    .reduce((prevVal, currVal) => {
      return [...prevVal, currVal.name];
    }, [])
    .join(", ");

  return <span>{artists}</span>;
}

export default Artists;
