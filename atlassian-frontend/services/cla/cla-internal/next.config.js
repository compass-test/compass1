const withSourceMaps = require('@zeit/next-source-maps');
const {
  sentryBrowserDSN,
  microsEnv,
  microsServiceVersion,
} = require('./config');

module.exports = withSourceMaps({
  publicRuntimeConfig: {
    SENTRY_BROWSER_DSN: sentryBrowserDSN,
    MICROS_ENV: microsEnv,
    MICROS_SERVICE_VERSION: microsServiceVersion,
  },
});
