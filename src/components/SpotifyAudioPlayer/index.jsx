import React from "react";

import { spotifyAPI, useSpotifyWebPlaybackSDK } from "../../libs/spotify";
import { getToken } from "../../utils/localStorage";

import { useDataLayerValue } from "../../state/DataLayer";
import { getMyCurrentPlaybackState } from "../../state/actions";

import "./SpotifyAudioPlayer.css";

import TrackPanel from "./TrackPanel";
import CentralPanel from "./CentralPanel";
import RightPanel from "./RightPanel";

function SpotifyAudioPlayer() {
  const { state, dispatch } = useDataLayerValue();
  const { currentplaybackState } = state;

  useSpotifyWebPlaybackSDK({
    token: getToken(),
    onPlayerStateChanged: (playbackState) => {
      getMyCurrentPlaybackState(dispatch);
    },
  });

  const currentTrackName = currentplaybackState?.item.name;
  const albumImage = currentplaybackState?.item.album.images[2].url;
  const albumName = currentplaybackState?.item.album?.name;
  const artists = currentplaybackState?.item.artists
    .reduce((prevVal, currVal) => {
      return [...prevVal, currVal.name];
    }, [])
    .join(", ");

  return (
    <div className="spotifyAudioPlayer">
      <div className="spotifyAudioPlayer__left">
        <TrackPanel
          shouldDisplay={currentplaybackState?.item}
          image={albumImage}
          title={currentTrackName}
          artists={artists}
          album={albumName}
        />
      </div>

      <div className="spotifyAudioPlayer__center">
        <CentralPanel
          isPlaying={currentplaybackState?.is_playing}
          shuffle={currentplaybackState?.shuffle_state}
          repeat={currentplaybackState?.repeat_state}
          onRepeatChange={(value) => spotifyAPI.setRepeat(value)}
          onShuffleChange={(value) => spotifyAPI.setShuffle(value)}
          onSkipPrevious={() => spotifyAPI.skipToPrevious()}
          onSkipNext={() => spotifyAPI.skipToNext()}
          onPlayPause={(value) => {
            if (value) spotifyAPI.play();
            else spotifyAPI.pause();
          }}
        />
      </div>

      <div className="spotifyAudioPlayer__right">
        <RightPanel
          isPlaying={currentplaybackState?.is_playing}
          onMuteChange={(_value) => spotifyAPI.setVolume(_value)}
          onVolumeChange={(_value) => spotifyAPI.setVolume(_value)}
          volume={currentplaybackState?.device?.volume_percent}
        />
      </div>
    </div>
  );
}

export default SpotifyAudioPlayer;
