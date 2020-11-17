import React, { useEffect, useState } from "react";

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

  useEffect(() => {
    _setShuffle(shuffle);
    _setRepeat(repeat);
    _setIsPlaying(isPlaying);
  }, [shuffle, repeat, isPlaying]);

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
        className={`spotifyRemoteControl__icon ${
          _shuffle ? "spotifyRemoteControl__green" : null
        }`}
      />
      <SkipPrevious
        onClick={onSkipPrevious}
        className="spotifyRemoteControl__icon"
      />

      {_isPlaying ? (
        <PauseCircleOutlineOutlined
          onClick={_onPlayPauseClicked}
          className="spotifyRemoteControl__icon large"
        />
      ) : (
        <PlayCircleOutline
          onClick={_onPlayPauseClicked}
          className="spotifyRemoteControl__icon large"
        />
      )}

      <SkipNext onClick={onSkipNext} className="spotifyRemoteControl__icon" />
      <Repeat
        onClick={_onRepeatClicked}
        className={`spotifyRemoteControl__icon ${
          _repeat === REPEAT_STATUS.track ? "spotifyRemoteControl__green" : null
        }`}
      />
    </>
  );
}

export default CentralPanel;
