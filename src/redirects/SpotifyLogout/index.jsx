import { useEffect } from "react";
import { useLocation } from "react-router-dom";

import { actionTypes } from "../../state/actionTypes";

import { setToken, setTokenExpiry, setUser } from "../../utils/localStorage";
import { useDataLayerValue } from "../../state/DataLayer";

function SpotifyLogout({ history }) {
  const { state } = useLocation();
  const { dispatch } = useDataLayerValue();

  useEffect(() => {
    dispatch({
      type: actionTypes.SET_TOKEN,
      payload: null,
    });
    setToken(null);

    dispatch({
      type: actionTypes.SET_TOKEN_EXPIRY,
      payload: null,
    });
    setTokenExpiry(null);

    dispatch({
      type: actionTypes.SET_USER,
      payload: null,
    });
    setUser(null);

    history.push({
      pathname: "/",
      //passing `location.state` (state) because there could be an error message to be displayed on the login page for instance (such as a "session expired" error message for example)
      state,
    });
  }, [dispatch, history, state]);

  return null;
}

export default SpotifyLogout;
