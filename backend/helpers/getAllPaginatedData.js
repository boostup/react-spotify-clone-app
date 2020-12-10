const getParamsFromURL = require("./getParamsFromURL");
const spotifyUtils = require("./spotify.config");
const spotifyApi = spotifyUtils.spotifyApi;

const defaultOptions = {
  initialData: [],
  offset: 0,
  limit: 50,
  fields: undefined,
};

async function getAllPaginatedDataForId(apiMethodName, resourceId, options) {
  if (!(spotifyApi[apiMethodName] instanceof Function) || !resourceId)
    throw "Invalid `apiMethodName` or `resourceId` provided";

  try {
    const _options = {
      ...defaultOptions,
      ...options,
    };

    let nextOffset = _options.offset;
    let items = _options.initialData;

    while (nextOffset !== null) {
      const data = await spotifyApi[apiMethodName](resourceId, {
        limit: _options.limit,
        offset: nextOffset,
        fields: _options.fields,
      });
      items = items.concat(data.body.items);
      const params = getParamsFromURL(data.body.next);
      nextOffset = params ? parseInt(params.offset) : null;
    }
    return items;
  } catch (error) {
    throw error;
  }
}

async function getAllPaginatedData(apiMethodName, options) {
  if (!(spotifyApi[apiMethodName] instanceof Function))
    throw "Invalid `apiMethodName`";

  try {
    const _options = {
      ...defaultOptions,
      ...options,
    };

    let nextOffset = _options.offset;
    let items = _options.initialData;

    while (nextOffset !== null) {
      const data = await spotifyApi[apiMethodName]({
        limit: _options.limit,
        offset: nextOffset,
        fields: _options.fields,
      });
      items = items.concat(data.body.items);
      const params = getParamsFromURL(data.body.next);
      nextOffset = params ? parseInt(params.offset) : null;
    }
    return items;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  getAllPaginatedData,
  getAllPaginatedDataForId,
};
