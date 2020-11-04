import React from "react";

import Header from "../Header";
import Footer from "../Footer";
import HtmlHeadTitle from "../HtmlHeadTitle";
import Sidebar from "../Sidebar";

import "./MainLayout.css";

function MainLayout({ title, children }) {
  return (
    <div className="mainLayout">
      <HtmlHeadTitle title={title} />
      <Sidebar className="mainLayout__sidebar sidebar" />
      <Header className="mainLayout__header header" />
      <div className="mainLayout__body">{children}</div>
      <Footer className="mainLayout__footer footer" />
    </div>
  );
}

export default MainLayout;
