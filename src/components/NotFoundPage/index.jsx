import React from "react";
import { Link } from "react-router-dom";
import HtmlHeadTitle from "../HtmlHeadTitle";

import "./NotFoundPage.css";

const logoPath = require("../../assets/spotifylogo.svg").default;
const vinylTopLayerPath = require("../../assets/vinyl-top-layer.svg").default;
const vinylTopBottomPath = require("../../assets/vinyl-bottom-layer.svg")
  .default;

const NotFoundPage = () => {
  return (
    <>
      <HtmlHeadTitle title="Oopsy doopsy ┐(´•_•`)┌ " />
      <div className="notFoundPage">
        <Link to="/" className="notFoundPage__logo">
          <img src={logoPath} alt="spotify logo" />
        </Link>

        <div className="notFoundPage__message">
          <p>Sorry, couldn't find that page.</p>
          <p></p>
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
