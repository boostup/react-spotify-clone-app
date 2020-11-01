import React from "react";

import Body from "../Body";
import Footer from "../Footer";
import Sidebar from "../Sidebar";

import "./Player.css";

function Player({ user }) {
  //   const { display_name } = user;

  return (
    <div className="player">
      <div className="player__body">
        <Sidebar />
        <Body />
      </div>
      <Footer />
    </div>
  );
}

export default Player;
