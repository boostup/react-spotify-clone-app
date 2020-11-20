import { useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";

import { empty } from "utils/localStorage";

function SpotifyLogout() {
  const { state } = useLocation();
  const history = useHistory();

  useEffect(() => {
    empty();
    history.push({
      pathname: "/login",
      //passing `location.state` (state) because there could be an error message to be displayed on the login page for instance (such as a "session expired" error message for example)
      state,
    });
  }, [history, state]);

  return null;
}

export default SpotifyLogout;
