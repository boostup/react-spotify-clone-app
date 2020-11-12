import React, { useEffect } from "react";
import { Redirect } from "react-router-dom";
import { spotifyAPI } from "../../libs/spotify";

import { getUser, getToken, getTokenExpiry } from "../../utils/localStorage";
import { useDataLayerValue } from "../../state/DataLayer";

import LoginPage from "../../pages/LoginPage";
import { setToken, setTokenExpiry, setUser } from "../../state/actions";

const LoggedInOrNot = () => {
  const { state, dispatch } = useDataLayerValue();
  const lsUser = getUser();

  useEffect(() => {
    const lsToken = getToken();
    const { token } = state;
    const { user } = state;

    //This is to avoid unnecessary value changes
    if (user && token) return;

    if (lsToken) {
      spotifyAPI.setAccessToken(lsToken);
      dispatch(setToken(lsToken));
      dispatch(setTokenExpiry(getTokenExpiry()));
    }

    lsUser && dispatch(setUser(lsUser));
  }, [lsUser, state, dispatch]);

  return lsUser ? (
    //
    <Redirect to="/home" />
  ) : (
    <LoginPage />
  );
};

export default LoggedInOrNot;
