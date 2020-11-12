import { useEffect } from "react";

import { getHashFromResponse } from "../../utils/http";
import { spotifyAPI } from "../../libs/spotify";
import * as ls from "../../utils/localStorage";
import { addMsToNow } from "../../utils/time";

import { useDataLayerValue } from "../../state/DataLayer";
import * as actions from "../../state/actions";

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
      dispatch(actions.setToken(_token));
      ls.setToken(_token);
      spotifyAPI.setAccessToken(_token);
      const expiryTime = addMsToNow(hash["expires_in"]);
      dispatch(actions.setTokenExpiry(expiryTime));
      ls.setTokenExpiry(expiryTime);

      actions.getMeAsync(dispatch).then((user) => {
        ls.setUser(user);
        history.push("/");
      });
    }
  }, [dispatch, history]);

  return null;
};

export default SpotifyLogin;
