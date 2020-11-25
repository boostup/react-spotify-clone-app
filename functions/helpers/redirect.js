module.exports = (_location, _callback, _statusCode, _body) => {
  return _callback(null, {
    statusCode: _statusCode || 302,
    headers: {
      Location: _location,
      "Cache-Control": "no-cache",
    },
    body: JSON.stringify(_body || {}),
  });
};
