import React, { useEffect, useState } from "react";
import { useDataLayerValue } from "../../state/DataLayer";

import "./SpotifyAudioPlayer.css";

import PlayCircleOutlineIcon from "@material-ui/icons/PlayCircleOutline";
import PauseCircleOutlineOutlinedIcon from "@material-ui/icons/PauseCircleOutlineOutlined";

import SkipPreviousIcon from "@material-ui/icons/SkipPrevious";
import SkipNextIcon from "@material-ui/icons/SkipNext";
import ShuffleIcon from "@material-ui/icons/Shuffle";
import RepeatIconOff from "@material-ui/icons/Repeat";

import VolumeDownIcon from "@material-ui/icons/VolumeDown";
import VolumeUpIcon from "@material-ui/icons/VolumeUp";
import VolumeMuteIcon from "@material-ui/icons/VolumeMute";

import { Slider } from "@material-ui/core";

function SpotifyAudioPlayer() {
  const { state, dispatch } = useDataLayerValue();
  const { currentplaybackState } = state;

  useEffect(() => {}, [dispatch, state.currentplaybackState]);

  // for progress bar:
  // - currentplaybackState?.item.duration_ms
  // - currentplaybackState?.progress_ms

  // currentplaybackState?.repeat_state: track, context, off
  // currentplaybackState?.shuffle_state: true, false
  // currentplaybackState?.item.type: "track"
  // currentplaybackState?.currently_playing_type;
  // currentplaybackState?.timestamp;

  console.log(currentplaybackState);

  function computeMuteButtonState(_volume) {
    let muteState = _volume >= 75 ? "loud" : null;
    if (_volume < 51) muteState = "standard";
    if (_volume === 0) muteState = "mute";
    return muteState;
  }

  const [volume, setVolume] = useState(
    currentplaybackState?.device.volume_percent
  );
  const [volumeBackupWhileMute, setVolumeBackupWhileMute] = useState(0);
  const [shuffle, setShuffle] = useState(currentplaybackState?.shuffle_state);
  const [repeat, setRepeat] = useState(currentplaybackState?.repeat_state);
  const [isPlaying, setIsPlaying] = useState(currentplaybackState?.is_playing);
  const [muteButtonState, setMuteButtonState] = useState(
    computeMuteButtonState(volume)
  );
  const currentTrackName = currentplaybackState?.item.name;
  const albumImage = currentplaybackState?.item.album.images[2].url;
  const albumName = currentplaybackState?.item.album?.name;
  const artists = currentplaybackState?.item.artists
    .reduce((prevVal, currVal) => {
      return [...prevVal, currVal.name];
    }, [])
    .join(", ");

  console.log("IS PLAYING", isPlaying);
  console.log("VOLUME PERCENT", volume);
  console.log("MUTE STATE", muteButtonState);
  console.log("SHUFFLE", shuffle);
  console.log("REPEAT", repeat);
  console.log("TRACK NAME", currentTrackName);
  console.log("ALBUM IMAGE", albumImage);
  console.log("ALBUM NAME", albumName);
  console.log("ARTISTS", artists);

  function onSliderChange(event, value) {
    console.log("onSliderChange", value);
    setVolume(value);
  }

  function onRepeatClicked() {
    setRepeat((repeat) => (repeat === "track" ? "off" : "track"));
  }

  function onShuffleClicked() {
    setShuffle((shuffle) => !shuffle);
  }
  function onSkipPreviousClicked() {
    //dispatch Prev track
  }
  function onSkipNextClicked() {
    //dispatch Next track
  }
  function onPlayPauseClicked() {
    setIsPlaying((isPlaying) => !isPlaying);
  }
  function onMuteClicked() {
    setMuteButtonState((muteStateValue) =>
      muteStateValue === "mute"
        ? computeMuteButtonState(volumeBackupWhileMute)
        : "mute"
    );
    setVolumeBackupWhileMute(volume);
    setVolume((volumeStateValue) =>
      volumeStateValue === 0 ? volumeBackupWhileMute : 0
    );
  }

  return (
    <div className="spotifyAudioPlayer">
      <div className="spotifyAudioPlayer__left">
        {currentplaybackState ? (
          <>
            <img
              className="spotifyAudioPlayer__albumLogo"
              src={albumImage}
              alt={albumName}
            />
            <div className="spotifyAudioPlayer__songInfo">
              <h4>{currentTrackName}</h4>
              <p>{artists}</p>
            </div>
          </>
        ) : null}
      </div>

      <div className="spotifyAudioPlayer__center">
        <ShuffleIcon
          onClick={onShuffleClicked}
          className={`spotifyAudioPlayer__icon ${
            shuffle ? "spotifyAudioPlayer__green" : null
          }`}
        />
        <SkipPreviousIcon
          onClick={onSkipPreviousClicked}
          className="spotifyAudioPlayer__icon"
        />

        {isPlaying ? (
          <PauseCircleOutlineOutlinedIcon
            onClick={onPlayPauseClicked}
            className="spotifyAudioPlayer__icon large"
          />
        ) : (
          <PlayCircleOutlineIcon
            onClick={onPlayPauseClicked}
            className="spotifyAudioPlayer__icon large"
          />
        )}

        <SkipNextIcon
          onClick={onSkipNextClicked}
          className="spotifyAudioPlayer__icon"
        />
        <RepeatIconOff
          onClick={onRepeatClicked}
          className={`spotifyAudioPlayer__icon ${
            repeat === "track" ? "spotifyAudioPlayer__green" : null
          }`}
        />
      </div>

      <div className="spotifyAudioPlayer__right">
        {muteButtonState === "loud" ? (
          <VolumeUpIcon
            onClick={onMuteClicked}
            className="spotifyAudioPlayer__icon"
          />
        ) : null}
        {muteButtonState === "standard" ? (
          <VolumeDownIcon
            onClick={onMuteClicked}
            className="spotifyAudioPlayer__icon"
          />
        ) : null}
        {muteButtonState === "mute" ? (
          <VolumeMuteIcon
            onClick={onMuteClicked}
            className="spotifyAudioPlayer__icon"
          />
        ) : null}

        <Slider
          className={`spotifyAudioPlayer__slider ${
            currentplaybackState
              ? "spotifyAudioPlayer__enabled"
              : "spotifyAudioPlayer__disabled"
          }`}
          onChange={onSliderChange}
          min={0}
          max={100}
          value={volume}
        />
      </div>
    </div>
  );
}

export default SpotifyAudioPlayer;
