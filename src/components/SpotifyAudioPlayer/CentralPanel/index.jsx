import React, { useState } from "react";

import {
  PlayCircleOutline,
  PauseCircleOutlineOutlined,
  SkipPrevious,
  SkipNext,
  Shuffle,
  Repeat,
} from "@material-ui/icons/";

const REPEAT_STATUS = {
  track: "track",
  off: "off",
};

function CentralPanel({
  isPlaying,
  shuffle,
  repeat,
  onRepeatChange,
  onShuffleChange,
  onSkipPrevious,
  onSkipNext,
  onPlayPause,
}) {
  const [_shuffle, _setShuffle] = useState(shuffle);
  const [_repeat, _setRepeat] = useState(repeat);
  const [_isPlaying, _setIsPlaying] = useState(isPlaying);

  function _onRepeatClicked() {
    _setRepeat((repeat) => {
      const value =
        repeat === REPEAT_STATUS.track
          ? REPEAT_STATUS.off
          : REPEAT_STATUS.track;
      onRepeatChange(value);
      return value;
    });
  }

  function _onShuffleClicked() {
    _setShuffle((value) => {
      onShuffleChange(!value);
      return !value;
    });
  }

  function _onPlayPauseClicked() {
    _setIsPlaying((isPlaying) => {
      const play = !isPlaying;
      onPlayPause(play);
      return !isPlaying;
    });
  }

  return (
    <>
      <Shuffle
        onClick={_onShuffleClicked}
        className={`spotifyAudioPlayer__icon ${
          _shuffle ? "spotifyAudioPlayer__green" : null
        }`}
      />
      <SkipPrevious
        onClick={onSkipPrevious}
        className="spotifyAudioPlayer__icon"
      />

      {_isPlaying ? (
        <PauseCircleOutlineOutlined
          onClick={_onPlayPauseClicked}
          className="spotifyAudioPlayer__icon large"
        />
      ) : (
        <PlayCircleOutline
          onClick={_onPlayPauseClicked}
          className="spotifyAudioPlayer__icon large"
        />
      )}

      <SkipNext onClick={onSkipNext} className="spotifyAudioPlayer__icon" />
      <Repeat
        onClick={_onRepeatClicked}
        className={`spotifyAudioPlayer__icon ${
          _repeat === REPEAT_STATUS.track ? "spotifyAudioPlayer__green" : null
        }`}
      />
    </>
  );
}

export default CentralPanel;
