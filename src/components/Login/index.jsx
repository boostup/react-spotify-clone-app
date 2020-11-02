import React from "react";

import { loginUrl } from "../../spotify/utils";

import "./Login.css";

const SPOTIFY_LOGO = require("../../assets/spotify830x350.jpg")?.default;

function Login() {
  return (
    <div className="login">
      <img src={SPOTIFY_LOGO} alt="Spotify Logo" />
      <a href={loginUrl}>Login with Spotify</a>
    </div>
  );
}

export default Login;
