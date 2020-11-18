import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { startSpotifyAuth } from "../../redux/auth/actions";
import { selectAuth } from "../../redux/auth/selectors";

const SpotifyLogin = () => {
  const authState = useSelector(selectAuth);
  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    /**
     * STARTING MANUAL AUTHORIZATION PROCESS HERE
     */
    dispatch(startSpotifyAuth());
  }, [dispatch]);

  useEffect(() => {
    if (authState.success === false) {
      history.replace({
        pathname: "/login",
        state: { error: authState.error },
      });
    }
    if (authState.success === true) {
      history.replace({
        pathname: "/",
      });
    }
  }, [history, authState.error, authState.success]);

  return null;
};

export default SpotifyLogin;
