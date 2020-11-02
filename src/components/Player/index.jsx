import React from "react";

import Footer from "../Footer";
import PlaylistPage from "../PlaylistPage";
import Sidebar from "../Sidebar";

import "./Player.css";

function Player() {
  return (
    <div className="player">
      <div className="player__body">
        <Sidebar />
        <PlaylistPage />
      </div>
      <Footer />
    </div>
  );
}

export default Player;
