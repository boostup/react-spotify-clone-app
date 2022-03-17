require("dotenv").config();
const formattedReturn = require("./helpers/formattedReturn");
const spotifyUtils = require("./helpers/spotify.config");
const { getAllPaginatedData } = require("./helpers/getAllPaginatedData");
const mapFavoriteTracks = require("./helpers/mapFavoriteTracks");

const spotifyApi = spotifyUtils.spotifyApi;
const queryParams = spotifyUtils.queryParams;

exports.handler = async (event, context, callback) => {
  try {
    const data = await getSavedTracks(event);

    let tracks = data.map((item) => item.track);
    tracks = await mapFavoriteTracks(tracks);

    return formattedReturn(200, {
      items: tracks,
    });
  } catch (error) {
    console.error(error);
    return formattedReturn(500, {
      error: error.toString(),
    });
  }
};

async function getSavedTracks(event) {
  try {
    const accessToken = event.queryStringParameters[queryParams.ACCESS_TOKEN];

    spotifyApi.setAccessToken(accessToken);

    const savedTracks = await getAllPaginatedData("getMySavedTracks", {
      fields: "href,primary_color,tracks(total),items(id,name,images)",
    });

    return savedTracks;
  } catch (error) {
    throw error;
  }
}
