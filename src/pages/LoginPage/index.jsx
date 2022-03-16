import React from "react";
import { useLocation } from "react-router-dom";

import { AUTH_BACKEND_LOCATION } from "libs/spotify";

import { ReactComponent as Logo } from "assets/spotifLylogo.svg";

import "./LoginPage.css";
import WelcomeRecruiter from "./WelcomeRecruiter";

function LoginPage() {
  const location = useLocation();
  const error = location?.state?.error;

  const handleLogin = () => {
    window.location = AUTH_BACKEND_LOCATION;
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
      <WelcomeRecruiter />
    </div>
  );
}

export default LoginPage;
