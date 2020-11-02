import { useEffect } from "react";

import { SET_TOKEN, SET_USER } from "../../utils/constants";
import { getHashFromResponse } from "../../utils/http";
import spotifyAPI from "../../utils/spotify";
import { setToken, setUser } from "../../utils/localStorage";
import { useDataLayerValue } from "../DataLayer";

const SpotifyRedirect = ({ history }) => {
  const { dispatch } = useDataLayerValue();

  useEffect(() => {
    const hash = getHashFromResponse(window.location.hash);
    const _token = hash.access_token;

    if (_token) {
      dispatch({
        type: SET_TOKEN,
        payload: _token,
      });
      setToken(_token);
      spotifyAPI.setAccessToken(_token);
      spotifyAPI
        .getMe()
        .then((user) => {
          dispatch({
            type: SET_USER,
            payload: user,
          });
          return user;
        })
        .then((user) => {
          setUser(user);
          history.push("/");
        });
    }
  }, [dispatch, history]);

  return null;
};

export default SpotifyRedirect;
