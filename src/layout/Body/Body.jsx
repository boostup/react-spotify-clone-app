import React from "react";

function Body({ children, className, onScroll }) {
  const handleScroll = (e) => {
    e.target.scrollTop >= 70 ? onScroll(true) : onScroll(false);
  };

  return (
    <div className={className} onScroll={handleScroll}>
      {children}
    </div>
  );
}

export default Body;
