require("dotenv").config();
const formattedReturn = require("./helpers/formattedReturn");
const spotifyUtils = require("./helpers/spotify.config");
const getAllPaginatedData = require("./helpers/getAllPaginatedData");

const spotifyApi = spotifyUtils.spotifyApi;
const queryParams = spotifyUtils.queryParams;


exports.handler = async (event, context, callback) => {

  try {
    const data = await getAllPlaylists(event);
    return formattedReturn(200, {
      items: data,
    });
  } catch (error) {
    console.error(error);
    return formattedReturn(500, {
      error: error.toString(),
    });
  }
};

async function getAllPlaylists(event) {
  try {
    const userId = event.queryStringParameters["userId"];
    const accessToken = event.queryStringParameters[queryParams.ACCESS_TOKEN];

    spotifyApi.setAccessToken(accessToken);

    const playlists = await getAllPaginatedData("getUserPlaylists", userId,
      { fields: "href,primary_color,tracks(total),items(id,name,images)" });

    return playlists;

  } catch (error) {
    throw error;
  }
}
