// next-css is a next plugin that allows importing of `.css` files
// e.g. @atlaskit/css-reset which is pure CSS (bundle.css)
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
