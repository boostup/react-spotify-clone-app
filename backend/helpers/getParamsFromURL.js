const querystring = require("querystring");

module.exports = (urlString) => {
  if (!urlString) return null;

  const splitResult = urlString.split("?");
  if (!(splitResult instanceof Array)) return null;

  return querystring.parse(splitResult[1]);
};
