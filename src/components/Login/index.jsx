import React from "react";

import { SPOTIFY_LOGO } from "../../spotify/constants";
import { loginUrl } from "../../spotify/utils";

import "./Login.css";

function Login() {
  return (
    <div className="login">
      <img src={SPOTIFY_LOGO} alt="Spotify Logo" />
      <a href={loginUrl}>Login with Spotify</a>
    </div>
  );
}

export default Login;
