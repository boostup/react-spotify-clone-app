import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Grow } from "@material-ui/core";

import { DEVICE_NAME, useSpotifyWebPlaybackSDK } from "libs/spotify";
import { getToken } from "utils/localStorage";

import {
  selectFooterError,
  selectFooterCurrentPlaybackState,
} from "redux/footer/selectors";
import { fetchCurrentPlaybackState } from "redux/footer/actions";
import * as actions from "redux/footer/async-actions";

import "./SpotifyRemoteControl.css";

import TrackPanel from "./TrackPanel";
import CentralPanel from "./CentralPanel";
import RightPanel from "./RightPanel";

function SpotifyRemoteControl() {
  const dispatch = useDispatch();
  const currentplaybackState = useSelector(selectFooterCurrentPlaybackState);
  const remoteControlError = useSelector(selectFooterError);
  const [displayError, setDisplayError] = useState(remoteControlError !== null);

  useEffect(() => {
    setDisplayError(remoteControlError);
  }, [remoteControlError]);

  useSpotifyWebPlaybackSDK({
    deviceName: DEVICE_NAME,
    token: getToken(),
    onPlayerStateChanged: (playbackState) => {
      //Normally, i would use the values of the `playbackState` object returned here, however, the Spotify Playback SDK is in BETA at this very moment, and the data is not consistent with the data provided through the Spotify Web API.  Therefore, I make here yet another request, just to get consistent data object types
      dispatch(fetchCurrentPlaybackState());
    },
  });

  const currentTrackName = currentplaybackState?.item.name;
  const albumImage = currentplaybackState?.item.album.images[2].url;
  const albumName = currentplaybackState?.item.album?.name;
  const artists = currentplaybackState?.item.artists;

  return (
    <div className="spotifyRemoteControl">
      <Grow in={displayError}>
        <p className="spotifyRemoteControl__error">
          Remote control failed: No active device. Please start playing music on
          your spotify account for this remote control to work.
          <button
            className="spotifyButton"
            onClick={() => setDisplayError(false)}
          >
            dismiss
          </button>
        </p>
      </Grow>

      <div className="spotifyRemoteControl__left">
        <TrackPanel
          shouldDisplay={currentplaybackState?.item}
          image={albumImage}
          title={currentTrackName}
          artists={artists}
          album={albumName}
        />
      </div>

      <div className="spotifyRemoteControl__center">
        <CentralPanel
          isPlaying={currentplaybackState?.is_playing}
          shuffle={currentplaybackState?.shuffle_state}
          repeat={currentplaybackState?.repeat_state}
          onRepeatChange={(value) => actions.toggleRepeat(value, dispatch)}
          onShuffleChange={(value) => actions.toggleShuffle(value, dispatch)}
          onSkipPrevious={() => actions.skipToPrevious(dispatch)}
          onSkipNext={() => actions.skipToNext(dispatch)}
          onPlayPause={(value) => actions.togglePlayPause(value, dispatch)}
        />
      </div>

      <div className="spotifyRemoteControl__right">
        <RightPanel
          isPlaying={currentplaybackState?.is_playing}
          onMuteChange={(_value) => actions.setVolume(_value, dispatch)}
          onVolumeChange={(_value) => actions.setVolume(_value, dispatch)}
          volume={currentplaybackState?.device.volume_percent}
        />
      </div>
    </div>
  );
}

export default SpotifyRemoteControl;
