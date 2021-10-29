require('dotenv').config();

module.exports = {
  ASAPEnabled: process.env.ASAP_ENABLED,
  ASAPKeyRepo: process.env.ASAP_PUBLIC_KEY_REPOSITORY_URL,
  ASAPKeyFallbackRepo: process.env.ASAP_PUBLIC_KEY_FALLBACK_REPOSITORY_URL,
  dbURL: process.env.PG_DB_URL,
  microsEnv: process.env.MICROS_ENV,
  microsServiceVersion: process.env.MICROS_SERVICE_VERSION,
  nodeEnv: process.env.NODE_ENV,
  port: process.env.PORT,
  sentryBrowserDSN: process.env.SENTRY_BROWSER_DSN,
  sentryServerDSN: process.env.SENTRY_SERVER_DSN,
};
