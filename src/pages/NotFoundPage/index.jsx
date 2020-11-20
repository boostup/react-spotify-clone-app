import React from "react";
import { Link } from "react-router-dom";

import HtmlHeadTitle from "layout/HtmlHeadTitle";
import { ReactComponent as Logo } from "assets/spotifLylogo.svg";

import "./NotFoundPage.css";

const vinylTopLayerPath = require("assets/vinyl-top-layer.svg").default;
const vinylTopBottomPath = require("assets/vinyl-bottom-layer.svg").default;

const NotFoundPage = ({ message }) => {
  const _message = message ? message : "Sorry, couldn't find that page.";

  return (
    <>
      <HtmlHeadTitle title="Oopsy doopsy ┐(´•_•`)┌ " />
      <div className="notFoundPage">
        <Link to="/" className="notFoundPage__logo">
          <Logo />
        </Link>

        <div className="notFoundPage__message">
          <p>{_message}</p>
        </div>

        <div className="notFoundPage__vinylContainer">
          <img src={vinylTopLayerPath} alt="vinyl" />
          <img src={vinylTopBottomPath} alt="vinyl player" />
        </div>
      </div>
    </>
  );
};
export default NotFoundPage;
