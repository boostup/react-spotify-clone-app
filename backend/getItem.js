const formattedReturn = require("./helpers/formattedReturn");
const getAllPaginatedData = require("./helpers/getAllPaginatedData");
const spotifyUtils = require("./helpers/spotify.config");
const queryParams = spotifyUtils.queryParams;
const spotifyApi = spotifyUtils.spotifyApi;

exports.handler = async (event, context, callback) => {
  try {
    const userId = event.queryStringParameters["userId"];
    const itemType = event.queryStringParameters["variant"];
    const itemId = event.queryStringParameters["itemId"];
    const accessToken = event.queryStringParameters[queryParams.ACCESS_TOKEN];
    spotifyApi.setAccessToken(accessToken);

    let item = null;
    if (itemType === "album") {
      item = await getAlbum(itemId);
    }
    else if (itemType === "playlist") {
      item = await getPlaylist(userId, itemId);
    }
    return formattedReturn(200, item);
  } catch (error) {
    console.error(error);
    return formattedReturn(500, error);
  }
};


// /api/getItem?userId=lesliemurcy&variant=album&itemId=62U7xIHcID94o20Of5ea4D&access_token=BQAzlCbFBD6LTOgoX2Cd3-PkjTagFAr0kPR5Lp8yPQh3WwSsQkZJ3jUQni2x_AzFrMyC7o3hvhc7y2-mmVdMPyNq4jI2ZrVp1Uum772UBK2fhRff_2tcNF9KxlJE0vo3K9EyZHhBjz1V4SDQtcj-Eb1pPOHsMKPlq72vWuj5b67iTmuxkdvZ1Q9iwmmMFLNHnSeYWocbcXAoPz-IGQ
async function getAlbum(itemId) {
  try {
    const metadata = await spotifyApi.getAlbum(itemId);

    //Check if user Follows the Playlist => https://developer.spotify.com/documentation/web-api/reference/follow/check-user-following-playlist/
    const is_favorite = await spotifyApi.containsMySavedAlbums([itemId]);

    const tracks = await getAllPaginatedData("getAlbumTracks", itemId);

    const result = {
      ...metadata.body,
      is_favorite: is_favorite.body[0],
      tracks: { items: tracks }
    };
    return result;
  } catch (error) {
    throw error;
  }
}

// /api/getItem?userId=lesliemurcy&variant=playlist&itemId=37i9dQZF1DWZa8CSUr0hCY&access_token=BQAzlCbFBD6LTOgoX2Cd3-PkjTagFAr0kPR5Lp8yPQh3WwSsQkZJ3jUQni2x_AzFrMyC7o3hvhc7y2-mmVdMPyNq4jI2ZrVp1Uum772UBK2fhRff_2tcNF9KxlJE0vo3K9EyZHhBjz1V4SDQtcj-Eb1pPOHsMKPlq72vWuj5b67iTmuxkdvZ1Q9iwmmMFLNHnSeYWocbcXAoPz-IGQ
async function getPlaylist(userId, itemId) {
  const limit = 100;

  try {
    const metadata = await spotifyApi.getPlaylist(itemId);

    // Check if user saved the Album => https://developer.spotify.com/documentation/web-api/reference/library/get-users-saved-albums/
    const is_favorite = await spotifyApi.areFollowingPlaylist(null, itemId, [userId]);

    const tracks = await getAllPaginatedData("getPlaylistTracks", itemId, { limit });

    const result = {
      ...metadata.body,
      is_favorite: is_favorite.body[0],
      tracks: { items: tracks.map((i) => i.track) }
    };
    return result;
  } catch (error) {
    throw error;
  }


}