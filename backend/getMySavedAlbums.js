const formattedReturn = require("./helpers/formattedReturn");
const spotifyUtils = require("./helpers/spotify.config");
const { getAllPaginatedData } = require("./helpers/getAllPaginatedData");

const spotifyApi = spotifyUtils.spotifyApi;
const queryParams = spotifyUtils.queryParams;

exports.handler = async (event, context, callback) => {
  try {
    const data = await getAllSavedAlbums(event);
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

async function getAllSavedAlbums(event) {
  try {
    const accessToken = event.queryStringParameters[queryParams.ACCESS_TOKEN];
    spotifyApi.setAccessToken(accessToken);

    const albums = await getAllPaginatedData("getMySavedAlbums");
    return albums.map((item) => ({
      id: item.album.id,
      name: item.album.name,
      images: item.album.images,
    }));
  } catch (error) {
    throw error;
  }
}
