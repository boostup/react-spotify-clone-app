import React from "react";
import { debounce } from "utils/debounce";
import useScrollTop from "./useScrollTop";

function Body({ children, className, onScroll }) {
  const bodyRef = useScrollTop();

  const handleScroll = debounce((e) => {
    onScroll(e);
  }, 100);

  return (
    <div
      //
      className={className}
      onScroll={handleScroll}
    >
      <div id="topAnchor" ref={bodyRef}></div>
      {children}
    </div>
  );
}

export default Body;
