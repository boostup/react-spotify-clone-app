import SpotifyWebApi from "spotify-web-api-js";

const {
  REACT_APP_CLIENT_ID,
  REACT_APP_AUTHORIZE_PATH,
  REACT_APP_REFRESH_ACCESS_TOKEN_PATH,
  REACT_APP_BACKEND_TO_FRONTEND_REDIRECT_PATH,
} = process.env;

const redirectURI = encodeURIComponent(
  `${REACT_APP_BACKEND_TO_FRONTEND_REDIRECT_PATH}`
);

export const AUTH_BACKEND_LOCATION = `${REACT_APP_AUTHORIZE_PATH}?client_id=${REACT_APP_CLIENT_ID}&redirect_uri=${redirectURI}&response_type=token&show_dialog=true`;

export const REFRESH_ACCESS_TOKEN_BACKEND_LOCATION = `${REACT_APP_REFRESH_ACCESS_TOKEN_PATH}`;

export const DEVICE_NAME = `${process.env.REACT_APP_SPOTIFLY_DEVICE_ID} (${process.env.NODE_ENV})`;

export const spotifyAPI = new SpotifyWebApi();
