import React, { useEffect } from "react";

import { SET_PLAYLISTS, SET_TOKEN, SET_USER } from "./spotify/constants";
import { getHashFromResponse, spotifyAPI } from "./spotify/utils";
import { useDataLayerValue } from "./components/DataLayer";
import Login from "./components/Login";
import Player from "./components/Player";

import "./App.css";

function App() {
  const [{ token }, dispatch] = useDataLayerValue();

  useEffect(() => {
    const hash = getHashFromResponse();
    const _token = hash.access_token;

    if (_token) {
      dispatch({
        type: SET_TOKEN,
        payload: _token,
      });
      spotifyAPI.setAccessToken(_token);
      spotifyAPI.getMe().then((user) => {
        dispatch({
          type: SET_USER,
          payload: user,
        });
      });
      spotifyAPI.getUserPlaylists().then((playlists) => {
        dispatch({
          type: SET_PLAYLISTS,
          payload: playlists,
        });
      });
    }
  }, []);

  return (
    <div className="app">
      {token ? (
        <div>
          <Player spotifyAPI={spotifyAPI} />
        </div>
      ) : (
        <Login />
      )}
    </div>
  );
}

export default App;
