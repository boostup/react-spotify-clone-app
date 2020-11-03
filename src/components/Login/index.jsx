import React from "react";

import { LOGIN_LOCATION } from "../../utils/spotify";

import "./Login.css";

const SPOTIFY_LOGO = require("../../assets/spotifylogo.svg")?.default;

function Login() {
  const handleLogin = () => {
    window.location = LOGIN_LOCATION;
  };

  return (
    <div className="login">
      <img src={SPOTIFY_LOGO} alt="Spotify Logo" />
      <button onClick={handleLogin}>Login with Spotify</button>
    </div>
  );
}

export default Login;
