import React from "react";

import { getTokenExpiry } from "../../utils/localStorage";
import { isPast } from "../../utils/time";

import HtmlHeadTitle from "../../layout/HtmlHeadTitle";
import Sidebar from "../../layout/Sidebar";
import Header from "../../layout/Header";
import Body from "../../layout/Body/Body";
import Footer from "../../layout/Footer";

import "./MainLayoutPageWrapper.css";
import { useHistory } from "react-router-dom";

function MainLayoutPageWrapper({ title, children }) {
  const history = useHistory();

  if (isPast(getTokenExpiry())) {
    history.push({
      pathname: "/logout",
      state: { error: "Session Expired! Please login." },
    });
  }

  return (
    <div className="mainLayout">
      <HtmlHeadTitle title={title} />
      <Sidebar className="mainLayout__sidebar sidebar" />
      <Header className="mainLayout__header header" />
      <Body className="mainLayout__body body">{children}</Body>
      <Footer className="mainLayout__footer footer" />
    </div>
  );
}

export default MainLayoutPageWrapper;
