import React, { useEffect } from "react";
import { Redirect } from "react-router-dom";
import spotifyAPI from "../../utils/spotify";

import { SET_TOKEN, SET_USER } from "../../utils/constants";
import { getUser, getToken } from "../../utils/localStorage";
import { useDataLayerValue } from "../DataLayer";

import Login from "../Login";

const LoggedInOrNot = () => {
  const { dispatch } = useDataLayerValue();
  const token = getToken();
  const user = getUser();

  useEffect(() => {
    if (token) {
      spotifyAPI.setAccessToken(token);
      dispatch({
        type: SET_TOKEN,
        payload: token,
      });
    }

    user &&
      dispatch({
        type: SET_USER,
        payload: user,
      });
  }, [token, user, dispatch]);

  return user ? (
    //
    <Redirect to="/home" />
  ) : (
    <Login />
  );
};

export default LoggedInOrNot;
