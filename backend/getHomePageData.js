const formattedReturn = require("./helpers/formattedReturn");
const mapFavoriteTracks = require("./helpers/mapFavoriteTracks");
const spotifyUtils = require("./helpers/spotify.config");
const queryParams = spotifyUtils.queryParams;
const spotifyApi = spotifyUtils.spotifyApi;

// /api/getHomePageData?access_token=BQC0vrUeVqOKeVF9papddJ1QL2rj3nEjtbuBfnaI9iCDkn8k_kRCBJ7YivmUUfgGRFmZitJM673_s1t9ABpfBdH41QYmN179ycDJUetU78QYq6k7ZPj8exxFz7p45U0dGGuu0uCHZaK78JBIvaAfEnl-Y7r5eMjZlmtqkjk4qkQgR2_QzWQbYCtjmuC2RYFA4rvkJ6geY23u9xOcEg
exports.handler = async (event, context, callback) => {
  try {
    const accessToken = event.queryStringParameters[queryParams.ACCESS_TOKEN];
    spotifyApi.setAccessToken(accessToken);
    const limit = 5;
    return formattedReturn(200, {
      recentTracks: await getMyRecentTracks(limit),
      savedTracks: await getMySavedTracks(limit),
      topTracks: await getMyTopTracks(limit),
    });
  } catch (error) {
    console.error(error);
    return formattedReturn(500, error);
  }
};

async function getMyRecentTracks(limit = 5) {
  try {
    const data = await spotifyApi.getMyRecentlyPlayedTracks({ limit });
    let tracks = data.body.items.map((item) => item.track);
    tracks = await mapFavoriteTracks(tracks);
    return tracks;
  } catch (error) {
    throw error;
  }
}

async function getMySavedTracks(limit = 5) {
  try {
    const data = await spotifyApi.getMySavedTracks({ limit });
    let tracks = data.body.items.map((item) => item.track);
    tracks = await mapFavoriteTracks(tracks);
    return tracks;
  } catch (error) {
    throw error;
  }
}

async function getMyTopTracks(limit = 5) {
  try {
    const data = await spotifyApi.getMyTopTracks({ limit });
    let tracks = data.body.items;
    tracks = await mapFavoriteTracks(tracks);
    return tracks;
  } catch (error) {
    throw error;
  }
}
