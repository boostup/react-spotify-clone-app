require("dotenv").config();
const formattedReturn = require("./helpers/formattedReturn");
const redirect = require("./helpers/redirect");
const spotifyUtils = require("./helpers/spotify.config");
const spotifyApi = spotifyUtils.spotifyApi;
const scopes = spotifyUtils.scopes;

/**
 * 1) This function is invoked by the Front when a user clicks on `Login` in the Frontend
 * 2) This function allows to redirect the Frontend towards the Spotify authorization dialog, where the user can sign in with their account and then autorize the requested scopes.
 * 2) This dialog than redirects the user to `spotifyCallback` Backend function.
 */
exports.handler = async (event, context, callback) => {
  try {
    // Create the authorization URL
    const authorizeURL = spotifyApi.createAuthorizeURL(
      scopes,
      "some-state-of-my-choice-1", //state
      true //showDialog
    );
    return redirect(authorizeURL, callback);
  } catch (err) {
    console.error(err);
    return formattedReturn(500, err);
  }
};
