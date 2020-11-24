import React from "react";
import useScrollTop from "./useScrollTop";

function Body({ children, className, onScroll }) {
  const bodyRef = useScrollTop();

  return (
    <div ref={bodyRef} className={className} onScroll={onScroll}>
      {children}
    </div>
  );
}

export default Body;
