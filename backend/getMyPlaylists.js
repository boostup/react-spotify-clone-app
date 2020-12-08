require("dotenv").config();
const formattedReturn = require("./helpers/formattedReturn");
const redirect = require("./helpers/redirect");
const spotifyUtils = require("./helpers/spotify.config");
const spotifyApi = spotifyUtils.spotifyApi;
const queryParams = spotifyUtils.queryParams;
const getParamsFromURL = require("./helpers/getParamsFromURL");

exports.handler = async (event, context, callback) => {
  try {
    const data = await getAllPlaylists(event);
    return data;
  } catch (error) {
    return formattedReturn(500, err);
  }
};

async function getAllPlaylists(event) {
  try {
    const userId = event.queryStringParameters[queryParams.ID];
    const accessToken = event.queryStringParameters[queryParams.ACCESS_TOKEN];
    const refreshToken = event.queryStringParameters[queryParams.REFRESH_TOKEN];
    const offset = 0;
    //Max limit as per doc => https://developer.spotify.com/documentation/web-api/reference/playlists/get-a-list-of-current-users-playlists/
    const limit = 50; 

    spotifyApi.setAccessToken(accessToken);
    spotifyApi.setRefreshToken(refreshToken);

    let nextOffset = offset;
    let playlists = [];
    let data = null;
    while (nextOffset !== null) {
      data = await spotifyApi.getUserPlaylists(userId, {
        limit,
        offset: nextOffset,
        fields: "href,primary_color,tracks(total),items(id,name,images)",
      });
      // console.log("data.body.items", data.body.items instanceof Array);
      playlists = playlists.concat(data.body.items);
      // console.log(playlists);
      const params = getParamsFromURL(data.body.next);
      // console.log("params", params);
      nextOffset = params ? parseInt(params.offset) : null;
      // console.log("nextOffset", nextOffset);
      // console.log("------------------");
    }

    // console.log(playlists.length);

    return formattedReturn(200, {
      total: data.body.total,
      items: playlists,
    });
  } catch (err) {
    console.error(err);
    return err;
  }
}
