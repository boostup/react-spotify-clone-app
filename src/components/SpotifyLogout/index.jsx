import { useEffect } from "react";
import { SET_TOKEN, SET_TOKEN_EXPIRY, SET_USER } from "../../utils/constants";

import { setToken, setTokenExpiry, setUser } from "../../utils/localStorage";
import { useDataLayerValue } from "../DataLayer";

function SpotifyLogout({ history }) {
  const { dispatch } = useDataLayerValue();

  useEffect(() => {
    dispatch({
      type: SET_TOKEN,
      payload: null,
    });
    setToken(null);

    dispatch({
      type: SET_TOKEN_EXPIRY,
      payload: null,
    });
    setTokenExpiry(null);

    dispatch({
      type: SET_USER,
      payload: null,
    });
    setUser(null);

    history.push("/");
  }, [dispatch, history]);

  return null;
}

export default SpotifyLogout;
