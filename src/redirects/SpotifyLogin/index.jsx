import { useEffect } from "react";

import { actionTypes } from "../../state/actionTypes";
import { getHashFromResponse } from "../../utils/http";
import { spotifyAPI } from "../../libs/spotify";
import { setToken, setTokenExpiry, setUser } from "../../utils/localStorage";
import { addMsToNow } from "../../utils/time";

import { useDataLayerValue } from "../../state/DataLayer";

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
        type: actionTypes.SET_TOKEN,
        payload: _token,
      });
      setToken(_token);
      spotifyAPI.setAccessToken(_token);

      const expiryTime = addMsToNow(hash["expires_in"]);
      dispatch({
        type: actionTypes.SET_TOKEN_EXPIRY,
        payload: expiryTime,
      });
      setTokenExpiry(expiryTime);

      spotifyAPI
        .getMe()
        .then((user) => {
          dispatch({
            type: actionTypes.SET_USER,
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
