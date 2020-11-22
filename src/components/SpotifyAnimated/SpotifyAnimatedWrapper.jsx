import React from "react";

function SpotifyAnimatedWrapper({ children, logo, name }) {
  console.log(logo, name);

  let height = 168;
  let width = 559;
  if (logo && !name) {
    height = 300;
    width = 300;
  }

  return (
    <div id="wrapper">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={width}
        height={height}
        viewBox={`0 0 ${width} ${height}`}
        id="spotify--logo"
      >
        {children}
      </svg>
    </div>
  );
}

export default SpotifyAnimatedWrapper;
