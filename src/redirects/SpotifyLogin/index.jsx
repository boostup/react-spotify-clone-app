import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { authStart } from "_redux/auth/actions";
import { selectAuth } from "_redux/auth/selectors";

const SpotifyLogin = () => {
  const authState = useSelector(selectAuth);
  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    /**
     * STARTING AUTHORIZATION WITH TOKEN FROM SPOTIFY REDIRECTION
     */
    dispatch(authStart());
  }, [dispatch]);

  useEffect(() => {
    if (authState.success === true) {
      history.replace({
        pathname: "/",
      });
    }
  }, [history, authState.success]);

  return null;
};

export default SpotifyLogin;
