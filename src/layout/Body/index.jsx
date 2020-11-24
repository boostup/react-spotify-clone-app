import React from "react";
import useScrollTo from "utils/useScrollTo";

function Body({ children, className, onScroll }) {
  const bodyRef = useScrollTo();

  return (
    <div ref={bodyRef} className={className} onScroll={onScroll}>
      {children}
    </div>
  );
}

export default Body;
