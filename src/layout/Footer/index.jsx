import React from "react";

import PlayCircleOutlineIcon from "@material-ui/icons/PlayCircleOutline";
import SkipPreviousIcon from "@material-ui/icons/SkipPrevious";
import SkipNextIcon from "@material-ui/icons/SkipNext";
import ShuffleIcon from "@material-ui/icons/Shuffle";
import RepeatIcon from "@material-ui/icons/Repeat";
import PlaylistPlayIcon from "@material-ui/icons/PlaylistPlay";
import VolumeDownIcon from "@material-ui/icons/VolumeDown";
import { Slider } from "@material-ui/core";

import "./Footer.css";

function Footer(props) {
  return (
    <div {...props}>
      <div className="footer__left">
        <img
          className="footer__albumLogo"
          src="https://cdns-images.dzcdn.net/images/cover/b89c20012cccb051c8a4e04d98386f95/500x500.jpg"
          alt=""
        />
        <div className="footer__songInfo">
          <h4>Yeah!</h4>
          <p>Usher</p>
        </div>
      </div>

      <div className="footer__center">
        <ShuffleIcon className="footer__icon footer__green" />
        <SkipPreviousIcon className="footer__icon" />
        <PlayCircleOutlineIcon className="footer__icon large" />
        <SkipNextIcon className="footer__icon" />
        <RepeatIcon className="footer__icon footer__green" />
      </div>

      <div className="footer__right">
        <PlaylistPlayIcon className="footer__icon" />
        <VolumeDownIcon className="footer__icon" />
        <Slider />
      </div>
    </div>
  );
}

export default Footer;
