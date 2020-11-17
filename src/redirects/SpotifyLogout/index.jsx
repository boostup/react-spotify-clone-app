import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";

import * as ls from "../../utils/localStorage";
import * as actions from "../../redux/auth/actions";

function SpotifyLogout({ history }) {
  const { state } = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(actions.setToken(null));
    ls.setToken(null);
    dispatch(actions.setTokenExpiry(null));
    ls.setTokenExpiry(null);
    dispatch(actions.setUser(null));
    ls.setUser(null);

    history.push({
      pathname: "/",
      //passing `location.state` (state) because there could be an error message to be displayed on the login page for instance (such as a "session expired" error message for example)
      state,
    });
  }, [dispatch, history, state]);

  return null;
}

export default SpotifyLogout;
