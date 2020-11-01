import React, { useEffect, useState } from "react";

import "./App.css";

import { getHashFromResponse, spotify } from "./spotify/utils";
import Login from "./components/Login";
import Player from "./components/Player";

function App() {
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const hash = getHashFromResponse();
    const _token = hash.access_token;

    if (_token) {
      setToken(_token);
      spotify.setAccessToken(_token);
      spotify.getMe().then((user) => {
        console.log(":person", user);
        setUser(user);
      });
    }
  }, []);

  return (
    <div className="app">
      {token ? (
        <div>
          <Player user={user} />
          <code>{JSON.stringify(user)}</code>
        </div>
      ) : (
        <Login />
      )}
    </div>
  );
}

export default App;
