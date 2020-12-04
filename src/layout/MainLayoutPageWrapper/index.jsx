import React, { useState } from "react";

import HtmlHeadTitle from "../HtmlHeadTitle";
import Sidebar from "../Sidebar";
import Header from "../Header";
import Body from "../Body";
import Footer from "../Footer";
import SpotifyAnimated from "components/SpotifyAnimated/";
import { useSplashScreen } from "components/SpotifyAnimated/useSplashScreen";
import Busy from "components/Busy";

import "./MainLayoutPageWrapper.css";

function MainLayoutPageWrapper({ title, isLoading, children }) {
  const displaySplashScreen = useSplashScreen();

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
          {isLoading ? <Busy /> : children}
        </>
      </Body>
      <Footer className="mainLayout__footer footer" />
    </div>
  );
}

export default MainLayoutPageWrapper;
