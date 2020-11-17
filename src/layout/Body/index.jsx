import React from "react";

function Body({ children, className, onScroll }) {
  return (
    <div className={className} onScroll={onScroll}>
      {children}
    </div>
  );
}

export default Body;
