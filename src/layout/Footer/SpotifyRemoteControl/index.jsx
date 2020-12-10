import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { selectFooterCurrentPlaybackState } from "_redux/footer/selectors";

import * as actions from "_redux/footer/async-actions";

import "./SpotifyRemoteControl.css";

import TrackPanel from "./TrackPanel";
import CentralPanel from "./CentralPanel";
import RightPanel from "./RightPanel";

function SpotifyRemoteControl() {
  const dispatch = useDispatch();
  const currentplaybackState = useSelector(selectFooterCurrentPlaybackState);

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
