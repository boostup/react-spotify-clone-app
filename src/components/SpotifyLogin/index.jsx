import { useEffect } from "react";

import { SET_TOKEN, SET_TOKEN_EXPIRY, SET_USER } from "../../utils/constants";
import { getHashFromResponse } from "../../utils/http";
import spotifyAPI from "../../utils/spotify";
import { setToken, setTokenExpiry, setUser } from "../../utils/localStorage";
import { getNowPlusN } from "../../utils/time";

import { useDataLayerValue } from "../DataLayer";

const SpotifyLogin = ({ history }) => {
  const { dispatch } = useDataLayerValue();

  useEffect(() => {
    const hash = getHashFromResponse(window.location.hash);

    /**
     * this one ("/access_token") has a "/", why ? Because of HashRouter.
     * why HashRouter instead of typical BrowserRouter ?
     *
     * => https://github.com/boostup/react-spotify-clone-app/pull/2
     */
    const _token = hash["/access_token"];

    if (_token) {
      dispatch({
        type: SET_TOKEN,
        payload: _token,
      });
      setToken(_token);
      spotifyAPI.setAccessToken(_token);

      const expiryTime = getNowPlusN(hash["expires_in"]);
      dispatch({
        type: SET_TOKEN_EXPIRY,
        payload: expiryTime,
      });
      setTokenExpiry(expiryTime);

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

export default SpotifyLogin;
