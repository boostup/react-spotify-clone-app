const SpotifyWebApi = require("spotify-web-api-node");

const spotifyConfig = {
  clientId: process.env.BACKEND_CLIENT_ID,
  clientSecret: process.env.BACKEND_CLIENT_SECRET,
  redirectUri: process.env.SPOTIFY_DIALOG_TO_BACKEND_REDIRECT_URI,
};

const queryParams = {
  CODE: "code",
  ACCESS_TOKEN: "access_token",
  EXPIRES_IN: "expires_in",
  REFRESH_TOKEN: "refresh_token",
};

const scopes = [
  "playlist-read-private",
  "playlist-read-collaborative",
  "streaming",
  "user-library-read",
  "user-library-modify",
  "user-modify-playback-state",
  "user-read-currently-playing",
  "user-read-email",
  "user-read-playback-state",
  "user-read-private",
  "user-read-recently-played",
  "user-top-read",
];

module.exports = {
  queryParams: queryParams,
  scopes: scopes,
  spotifyApi: new SpotifyWebApi(spotifyConfig),
};
