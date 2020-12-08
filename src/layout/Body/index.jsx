import React from "react";
import { debounce } from "utils/debounce";
import useScrollIntoView from "./useScrollIntoView";

function Body({ children, className, onScroll }) {
  useScrollIntoView("#topAnchor");

  const handleScroll = debounce((e) => {
    onScroll(e);
  }, 100);

  return (
    <div
      //
      className={className}
      onScroll={handleScroll}
    >
      <div id="topAnchor"></div>
      {children}
    </div>
  );
}

export default Body;
