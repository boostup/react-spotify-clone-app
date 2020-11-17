import React, { useEffect } from "react";
import { Redirect } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { spotifyAPI } from "../../libs/spotify";

import { getUser, getToken, getTokenExpiry } from "../../utils/localStorage";

import LoginPage from "../../pages/LoginPage";

import { selectAuth } from "../../redux/auth/selectors";
import { setToken, setTokenExpiry, setUser } from "../../redux/auth/actions";

const LoggedInOrNot = () => {
  const dispatch = useDispatch();
  const auth = useSelector(selectAuth);
  const lsUser = getUser();

  useEffect(() => {
    const lsToken = getToken();
    const { user, token } = auth;

    //This is to avoid unnecessary value changes
    if (user && token) return;

    if (lsToken) {
      spotifyAPI.setAccessToken(lsToken);
      dispatch(setToken(lsToken));
      dispatch(setTokenExpiry(getTokenExpiry()));
    }

    lsUser && dispatch(setUser(lsUser));
  }, [lsUser, auth, dispatch]);

  return lsUser ? (
    //
    <Redirect to="/home" />
  ) : (
    <LoginPage />
  );
};

export default LoggedInOrNot;
