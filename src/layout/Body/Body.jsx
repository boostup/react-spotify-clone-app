import React from "react";

function Body({ children, className }) {
  const handlScroll = (e) => {
    let element = e.target;
    // => condition to reach bottom in case I need it: `element.scrollHeight - element.scrollTop === element.clientHeight`
    if (element.scrollTop > 50) {
      // console.log("do it", element.scrollTop);
    }
  };

  return (
    <div className={className} onScroll={handlScroll}>
      {children}
    </div>
  );
}

export default Body;
