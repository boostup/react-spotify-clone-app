import React from "react";

function Player({ user }) {
  const { display_name } = user;

  return <h1>{`Welcome to Spotify, ${display_name}`}</h1>;
}

export default Player;
