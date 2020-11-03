export const getHashFromResponse = (locationHash) => {
  return locationHash
    .substring(1)
    .split("&")
    .reduce((initial, item) => {
      let parts = item.split("=");
      initial[parts[0]] = decodeURIComponent(parts[1]);
      return initial;
    }, {});
};

export const isExternalResource = (url) => {
  return url.includes("http");
};
