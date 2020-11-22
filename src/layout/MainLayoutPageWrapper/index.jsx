import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { selectAuth } from "redux/auth/selectors";
import { authWithStoredTokenStart } from "redux/auth/actions";

import HtmlHeadTitle from "../HtmlHeadTitle";
import Sidebar from "../Sidebar";
import Header from "../Header";
import Body from "../Body";
import Footer from "../Footer";
import SpotifyAnimated from "components/SpotifyAnimated/";
import { useSplashScreen } from "components/SpotifyAnimated/useSplashScreen";

import "./MainLayoutPageWrapper.css";

function MainLayoutPageWrapper({ title, isLoading, children }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const authState = useSelector(selectAuth);
  const displaySplashScreen = useSplashScreen();

  useEffect(() => {
    /**
     * STARTING AUTHORIZATION WITH STORED TOKEN
     * This is useful to
     * 1) rehydrate Token & User data into the redux store in case the browser `page refresh` functionality was triggered by the user
     * 2) to check token expiry on every page change.  The `authWithStoredTokenStart` will end up setting `authState.success` to false, which as seen below, will redirect the user the login page.
     */
    dispatch(authWithStoredTokenStart());
  }, [dispatch]);

  useEffect(() => {
    if (authState.success === false) {
      history.replace({
        pathname: "/login",
        state: { error: authState.error },
      });
    }
  }, [history, authState]);

  const [bodyComponentScrollValue, setBodyComponentScrollValue] = useState(0);

  const handleScroll = (e) => {
    setBodyComponentScrollValue(e.target.scrollTop);
  };

  return (
    <div className="mainLayout">
      <HtmlHeadTitle title={title} />
      <Sidebar className="mainLayout__sidebar sidebar" />
      <Header
        className="mainLayout__header header"
        {...{ bodyComponentScrollValue }}
      />
      <Body onScroll={handleScroll} className="mainLayout__body body">
        <>
          {displaySplashScreen && <SpotifyAnimated logo name />}
          {isLoading ? <SpotifyAnimated logo /> : children}
        </>
      </Body>
      <Footer className="mainLayout__footer footer" />
    </div>
  );
}

export default MainLayoutPageWrapper;
