import React from "react";

import { getTokenExpiry } from "../../utils/localStorage";
import { useDataLayerValue } from "../../state/DataLayer";
import { isPast } from "../../utils/time";

import HtmlHeadTitle from "../../layout/HtmlHeadTitle";
import Sidebar from "../../layout/Sidebar";
import Header from "../../layout/Header";
import Body from "../../layout/Body/Body";
import Footer from "../../layout/Footer";

import "./MainLayoutPageWrapper.css";
import { useHistory } from "react-router-dom";
import {
  toggleDisplayPlaylistToolbar,
  toggleHeaderScrolled,
} from "../../state/actions";

function MainLayoutPageWrapper({ title, children }) {
  const history = useHistory();

  if (isPast(getTokenExpiry())) {
    history.push({
      pathname: "/logout",
      state: { error: "Session Expired! Please login." },
    });
  }

  const { state, dispatch } = useDataLayerValue();
  const { headerScrolled, isPlaylistPage, displayPlaylistToolbar } = state;

  const handleScroll = (e) => {
    const shouldDisplayHeaderBackground =
      e.target.scrollTop >= 70 ? true : false;
    if (headerScrolled !== shouldDisplayHeaderBackground)
      dispatch(toggleHeaderScrolled(shouldDisplayHeaderBackground));

    //PlaylistBanner component height + PlaylistToolbar component height = 473px
    const candDisplayPlaylistToolbar =
      isPlaylistPage && e.target.scrollTop >= 473 ? true : false;
    if (displayPlaylistToolbar !== candDisplayPlaylistToolbar) {
      console.log(
        "displayPlaylistToolbar",
        displayPlaylistToolbar,
        "candDisplayPlaylistToolbar",
        candDisplayPlaylistToolbar
      );
      dispatch(toggleDisplayPlaylistToolbar(candDisplayPlaylistToolbar));
    }
  };

  return (
    <div className="mainLayout">
      <HtmlHeadTitle title={title} />
      <Sidebar className="mainLayout__sidebar sidebar" />
      <Header
        className={`mainLayout__header header  ${
          headerScrolled ? "scrolled" : "top"
        }`}
      />
      <Body onScroll={handleScroll} className="mainLayout__body body">
        {children}
      </Body>
      <Footer className="mainLayout__footer footer" />
    </div>
  );
}

export default MainLayoutPageWrapper;
