import { useEffect } from "react";
const noop = () => {};
export function useSpotifyWebPlaybackSDK({
  token,
  onPlayerStateChanged = noop,
}) {
  useEffect(() => {
    window.onSpotifyWebPlaybackSDKReady = () => {
      const _token = token;
      const player = new window.Spotify.Player({
        name: "SpotifLy Demo (b00stup ;)",
        getOAuthToken: (cb) => {
          cb(_token);
        },
      });
      // Error handling
      player.addListener("initialization_error", ({ message }) => {
        console.error(message);
      });
      player.addListener("authentication_error", ({ message }) => {
        console.error(message);
      });
      player.addListener("account_error", ({ message }) => {
        console.error(message);
      });
      player.addListener("playback_error", ({ message }) => {
        console.error(message);
      });

      // Playback status updates
      player.addListener("player_state_changed", (state) => {
        console.log("Player State Changed");
        onPlayerStateChanged(state);
      });

      // Ready
      player.addListener("ready", ({ device_id }) => {
        console.log("Ready with Device ID", device_id);
      });

      // Not Ready
      player.addListener("not_ready", ({ device_id }) => {
        console.log("Device ID has gone offline", device_id);
      });

      // Connect to the player!
      player.connect();
    };

    if (!window.Spotify) {
      const scriptTag = document.createElement("script");
      scriptTag.src = "https://sdk.scdn.co/spotify-player.js";
      document.head.appendChild(scriptTag);
    }
  }, [onPlayerStateChanged, token]);
}
