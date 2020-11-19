import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { DEVICE_NAME, useSpotifyWebPlaybackSDK } from "../../../libs/spotify";
import { getToken } from "../../../utils/localStorage";

import { selectFooterCurrentPlaybackState } from "../../../redux/footer/selectors";
import * as actions from "../../../redux/footer/async-actions";

import "./SpotifyRemoteControl.css";

import TrackPanel from "./TrackPanel";
import CentralPanel from "./CentralPanel";
import RightPanel from "./RightPanel";

function SpotifyRemoteControl() {
  const dispatch = useDispatch();
  const currentplaybackState = useSelector(selectFooterCurrentPlaybackState);

  useSpotifyWebPlaybackSDK({
    deviceName: DEVICE_NAME,
    token: getToken(),
    onPlayerStateChanged: (playbackState) => {
      //Normally, i would use the values of the `playbackState` object returned here, however, the Spotify Playback SDK is in BETA at this very moment, and the data is not consistent with the data provided through the Spotify Web API.  Therefore, I make here yet another request, just to get consistent data object types
      actions.getMyCurrentPlaybackStateAsync(dispatch);
    },
  });

  const currentTrackName = currentplaybackState?.item.name;
  const albumImage = currentplaybackState?.item.album.images[2].url;
  const albumName = currentplaybackState?.item.album?.name;
  const artists = currentplaybackState?.item.artists;

  return (
    <div className="spotifyRemoteControl">
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
          onRepeatChange={(value) => actions.toggleRepeat(value)}
          onShuffleChange={(value) => actions.toggleShuffle(value)}
          onSkipPrevious={() => actions.skipToPrevious()}
          onSkipNext={() => actions.skipToNext()}
          onPlayPause={(value) => {
            currentplaybackState?.item
              ? actions.togglePlayPause(value)
              : alert(
                  `In order to use this remote control, please open any official Spotify app, and than select the device called "${DEVICE_NAME}" (Spotify Premium accounts only).`
                );
          }}
        />
      </div>

      <div className="spotifyRemoteControl__right">
        <RightPanel
          isPlaying={currentplaybackState?.is_playing}
          onMuteChange={(_value) => actions.setVolume(_value)}
          onVolumeChange={(_value) => actions.setVolume(_value)}
          volume={currentplaybackState?.device.volume_percent}
        />
      </div>
    </div>
  );
}

export default SpotifyRemoteControl;
