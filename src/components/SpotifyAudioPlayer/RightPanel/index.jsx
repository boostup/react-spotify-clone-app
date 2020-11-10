import React, { useState } from "react";

import { VolumeDown, VolumeUp, VolumeMute } from "@material-ui/icons/";
import { Slider } from "@material-ui/core";

const MUTE_STATUS = {
  loud: "loud",
  standard: "standard",
  off: "off",
};

function RightArea({ isPlaying, volume, onMuteChange, onVolumeChange }) {
  const [_muteButtonStatus, _setMuteButtonStatus] = useState(
    computeMuteButtonState(volume)
  );

  const [_volume, _setVolume] = useState(volume);
  const [_volumeBackupWhileMute, _setVolumeBackupWhileMute] = useState(0);

  const _onVolumeSliderChange = (event, value) => {
    console.log("onVolumeSliderChange", value);
    _setVolume(value);
    _setMuteButtonStatus(computeMuteButtonState(value));
    onVolumeChange(value);
  };

  const _onMuteClicked = () => {
    _setMuteButtonStatus((_prevMuteStatus) =>
      _prevMuteStatus === MUTE_STATUS.off
        ? computeMuteButtonState(_volumeBackupWhileMute)
        : MUTE_STATUS.off
    );
    _setVolumeBackupWhileMute(_volume);
    _setVolume((_prevVolume) => {
      const _newVolume = _prevVolume === 0 ? _volumeBackupWhileMute : 0;
      onMuteChange(_newVolume);
      return _newVolume;
    });
  };

  return (
    <>
      {_muteButtonStatus === MUTE_STATUS.loud ? (
        <VolumeUp
          onClick={_onMuteClicked}
          className="spotifyAudioPlayer__icon"
        />
      ) : null}
      {_muteButtonStatus === MUTE_STATUS.standard ? (
        <VolumeDown
          onClick={_onMuteClicked}
          className="spotifyAudioPlayer__icon"
        />
      ) : null}
      {_muteButtonStatus === MUTE_STATUS.off ? (
        <VolumeMute
          onClick={_onMuteClicked}
          className="spotifyAudioPlayer__icon"
        />
      ) : null}
      <Slider
        className={`spotifyAudioPlayer__slider ${
          isPlaying
            ? "spotifyAudioPlayer__enabled"
            : "spotifyAudioPlayer__disabled"
        }`}
        onChange={_onVolumeSliderChange}
        min={0}
        max={100}
        value={_volume}
      />
    </>
  );
}

function computeMuteButtonState(_volume) {
  let muteStatus;
  if (_volume >= 70) muteStatus = MUTE_STATUS.loud;
  else if (_volume >= 1) muteStatus = MUTE_STATUS.standard;
  else muteStatus = MUTE_STATUS.off;
  return muteStatus;
}

export default RightArea;
