import React, { useEffect } from "react";
import { Redirect } from "react-router-dom";
import { spotifyAPI } from "../../libs/spotify";

import { actionTypes } from "../../state/actionTypes";
import { getUser, getToken, getTokenExpiry } from "../../utils/localStorage";
import { useDataLayerValue } from "../../state/DataLayer";

import LoginPage from "../../pages/LoginPage";

const LoggedInOrNot = () => {
  const { state, dispatch } = useDataLayerValue();
  const lsUser = getUser();

  useEffect(() => {
    const lsToken = getToken();
    const { token } = state;
    const { user } = state;

    if (user && token) return;

    if (lsToken) {
      spotifyAPI.setAccessToken(lsToken);
      dispatch({
        type: actionTypes.SET_TOKEN,
        payload: lsToken,
      });

      dispatch({
        type: actionTypes.SET_TOKEN_EXPIRY,
        payload: getTokenExpiry(),
      });
    }

    lsUser &&
      dispatch({
        type: actionTypes.SET_USER,
        payload: lsUser,
      });
  }, [lsUser, state, dispatch]);

  return lsUser ? (
    //
    <Redirect to="/home" />
  ) : (
    <LoginPage />
  );
};

export default LoggedInOrNot;
