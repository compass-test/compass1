const redirectUrls = require('./constants/redirect-urls');

function getRedirectURL(to) {
  if (!to) return undefined;

  const removeTrailingSlash = (path) => {
    return path.endsWith('/') ? path.slice(0, -1) : path;
  };

  const pathFound = redirectUrls.find(
    (redirect) => removeTrailingSlash(to) === redirect[0],
  );

  if (pathFound) {
    return pathFound[1];
  }

  return undefined;
}

function createResponse(request) {
  const redirectUri = getRedirectURL(request.uri);
  if (!redirectUri) return request;

  const response = {
    status: '301',
    statusDescription: 'Moved Permanently',
    headers: {
      location: [
        {
          key: 'Location',
          value: redirectUri,
        },
      ],
      'cache-control': [
        {
          key: 'Cache-Control',
          value: 'max-age=3600',
        },
      ],
    },
  };

  return response;
}

function handler(event, context, callback) {
  if (event.microsHealthCheck) {
    return callback(null, {
      status: 'ok',
    });
  }

  const { request } = event.Records[0].cf;
  // eslint-disable-next-line no-console
  const response = createResponse(request);
  // Grab redirect list
  // Format redirect list
  return callback(null, response);
}

module.exports.handler = handler;
module.exports.getRedirectURL = getRedirectURL;
module.exports.createResponse = createResponse;
