const formattedReturn = require("./helpers/formattedReturn");
const spotifyApi = spotifyUtils.spotifyApi;

exports.handler = async (event, context, callback) => {
  try {
    const APIfnName = `get${event.queryStringParameters["type"]}`;
    const itemMetadata = spotifyApi[APIfnName](id);

    // To get the total duration of the playlist or album, although the frontend only displays the first paginated tracks when ItemPage first loads, I need:
    // 1) all track ids included in the item
    // 2) fetch all tracks
    // 3) add their indivual duration by reducing the array of tracks

    const itemTotalDuration;

    // getAlbumTracks, getPlaylistTracks

    // const itemPaginatedTracks = spotifyApi.getTracks(id, {limit, offset})
  } catch (error) {
    console.error(err);
    return formattedReturn(500, err);
  }
};
