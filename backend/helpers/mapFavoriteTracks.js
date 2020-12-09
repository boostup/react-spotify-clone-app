const spotifyUtils = require("./spotify.config");
const spotifyApi = spotifyUtils.spotifyApi;

module.exports = async function mapFavoriteTracks(tracks) {
  try {
    const trackIds = tracks.map((track) => track.id);
    const favorites = await spotifyApi.containsMySavedTracks(trackIds);
    return tracks.map((track, i) => {
      track.is_favorite = favorites.body[i];
      return track;
    });
  } catch (error) {
    throw error;
  }
};
