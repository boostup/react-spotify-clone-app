import React from "react";
import { useLocation } from "react-router-dom";

import { LOGIN_LOCATION } from "libs/spotify";

import { ReactComponent as Logo } from "assets/spotifLylogo.svg";

import "./LoginPage.css";

function LoginPage() {
  const location = useLocation();
  const error = location?.state?.error;

  const handleLogin = () => {
    window.location = LOGIN_LOCATION;
  };

  return (
    <div className="login">
      <Logo />
      <button className="spotifyButton" onClick={handleLogin}>
        Login with Spotify
      </button>
      {error && (
        <div>
          <p>{error}</p>
        </div>
      )}
    </div>
  );
}

export default LoginPage;
