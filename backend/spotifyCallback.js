require("dotenv").config();
const formattedReturn = require("./helpers/formattedReturn");
const redirect = require("./helpers/redirect");
const spotifyUtils = require("./helpers/spotify.config");
const queryParams = spotifyUtils.queryParams;
const spotifyApi = spotifyUtils.spotifyApi;

/**
 * 1) This function is invoked when the Spotify authorization dialog is allowed by the user, passing the `code` query parameter in the URL.
 * 2) This function then requests the expiry duration, access and refresh tokens from Spotify API.
 * 3) The Backend then passes these values to the Frontend as query parameters in the `process.env.BACKEND_TO_FRONTEND_REDIRECT_URI` redirection url
 */
exports.handler = async (event, context, callback) => {
  try {
    const code = event.queryStringParameters[queryParams.CODE];
    const data = await spotifyApi.authorizationCodeGrant(code);

    const expiresIn = data.body[queryParams.EXPIRES_IN];
    const accessToken = data.body[queryParams.ACCESS_TOKEN];
    const refreshToken = data.body[queryParams.REFRESH_TOKEN];

    // console.log("The token expires in " + expiresIn);
    // console.log("The access token is " + accessToken);
    // console.log("The refresh token is " + refreshToken);

    const frontEndRedirect = `${process.env.BACKEND_TO_FRONTEND_REDIRECT_URI}?${queryParams.ACCESS_TOKEN}=${accessToken}&${queryParams.EXPIRES_IN}=${expiresIn}&${queryParams.REFRESH_TOKEN}=${refreshToken}`;

    return redirect(frontEndRedirect, callback);
  } catch (err) {
    console.error(err);
    if (err.statusCode === 400) return redirect("/", callback);
    return formattedReturn(500, err);
  }
};
