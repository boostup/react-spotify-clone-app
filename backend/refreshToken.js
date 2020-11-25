require("dotenv").config();
const formattedReturn = require("./helpers/formattedReturn");
const spotifyUtils = require("./helpers/spotify.config");
const queryParams = spotifyUtils.spotifyUtils;
const spotifyApi = spotifyUtils.spotifyApi;

/**
 * 1) This function is inovoked by the Frontend when it computes that its access token has expired, passing the `access_token` and `refresh_token` query parameter in the URL.
 * 2) This function requests a refreshed token from Spotify API using the params it received
 * 3) It sends the new refreshed token back to the Frontend using JSON
 */
exports.handler = async (event, context, callback) => {
  const expiredAccessToken =
    event.queryStringParameters[queryParams.ACCESS_TOKEN];
  const refreshToken = event.queryStringParameters[queryParams.REFRESH_TOKEN];

  // Set the access token on the API object to use it in later calls
  spotifyApi.setAccessToken(expiredAccessToken);
  spotifyApi.setRefreshToken(refreshToken);

  try {
    const data = await spotifyApi.refreshAccessToken();
    console.log("The access token has been refreshed!", data.body);
    response.set("Access-Control-Allow-Origin", "*");

    return formattedReturn(200, {
      [queryParams.ACCESS_TOKEN]: data.body[queryParams.ACCESS_TOKEN],
      [queryParams.EXPIRES_IN]: data.body[queryParams.EXPIRES_IN],
    });
  } catch (error) {
    console.error(err);
    return formattedReturn(500, err);
  }
};
