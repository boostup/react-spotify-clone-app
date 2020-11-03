import SpotifyWebApi from "spotify-web-api-js";

import {
  REACT_APP_CLIENT_ID,
  REACT_APP_AUTHORIZE_URL,
  REACT_APP_REDIRECT_BASE_URL,
  REACT_APP_REDIRECT_PATH,
} from "./constants";

const redirectURI = encodeURIComponent(
  `${REACT_APP_REDIRECT_BASE_URL}${REACT_APP_REDIRECT_PATH}`
);

export const LOGIN_LOCATION = `${REACT_APP_AUTHORIZE_URL}?client_id=${REACT_APP_CLIENT_ID}&redirect_uri=${redirectURI}&response_type=token&show_dialog=true`;

export default new SpotifyWebApi();
