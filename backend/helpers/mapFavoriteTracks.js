const spotifyUtils = require("./spotify.config");
const spotifyApi = spotifyUtils.spotifyApi;

//The Spotify Web API endpoint `containsMySavedTracks` allows for a max of 50 tracks ids per call. Hence the whole mess down here of having to make slices of 50 tracks at a time
module.exports = async function mapFavoriteTracks(tracks) {
  try {
    const totalTracks = tracks.length;
    const trackIds = tracks.map((track) => track.id);
    let allFavorites = [];
    const offset = 0;
    const limit = 50;

    let minOffset = offset;
    let maxOffset = minOffset + limit;

    while (minOffset < totalTracks) {
      maxOffset = maxOffset < totalTracks ? maxOffset : totalTracks;
      const slice = trackIds.slice(minOffset, maxOffset);
      const favorites = await spotifyApi.containsMySavedTracks(slice);
      allFavorites = allFavorites.concat(favorites.body);
      minOffset = maxOffset;
      maxOffset = minOffset + limit;
    }

    return tracks.map((track, i) => {
      track.is_favorite = allFavorites[i];
      return track;
    });
  } catch (error) {
    throw error;
  }
};
