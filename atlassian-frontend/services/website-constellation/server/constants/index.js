const { Secrets } = require('@atlassian/micros-serverless-platform');

const getEnv = (name) => {
  return async () => {
    if (process.env.NETLIFY_DEV || process.env.CONSTELLATION_NETLIFY_DEPLOY) {
      return process.env[name];
    }
    const value = await Secrets.get(name);
    if (!value) {
      return null;
    }

    return value;
  };
};

module.exports.googleCallbackUrl = getEnv('CONSTELLATION_GOOGLE_CALLBACK_URL');
module.exports.googleClientId = getEnv('CONSTELLATION_GOOGLE_CLIENT_ID');
module.exports.googleClientSecret = getEnv(
  'CONSTELLATION_GOOGLE_CLIENT_SECRET',
);
module.exports.constellationUrl = getEnv('CONSTELLATION_CLIENT_ORIGIN');
module.exports.contentfulAccessToken = getEnv(
  'CONSTELLATION_CONTENTFUL_ACCESS_TOKEN',
);
module.exports.contentfulSpaceId = getEnv('CONSTELLATION_CONTENTFUL_SPACE_ID');
module.exports.jwtSecret = getEnv('CONSTELLATION_JWT_SECRET');
module.exports.jwtExpiry = getEnv('CONSTELLATION_JWT_EXPIRY');
module.exports.cookieSecret = getEnv('CONSTELLATION_COOKIE_SECRET');

module.exports.constellationCookie = getEnv('GATSBY_CONSTELLATION_COOKIE');
module.exports.constellationCookieDomain = getEnv(
  'GATSBY_CONSTELLATION_COOKIE_DOMAIN',
);
module.exports.apiPath = getEnv('GATSBY_CONSTELLATION_API_PATH');
module.exports.getEnv = getEnv;
