/* eslint-disable global-require, no-console */
const {
  sentryServerDSN,
  microsEnv,
  microsServiceVersion,
  nodeEnv,
  port,
} = require('../config');
const logger = require('./logger');
const { errorToJson } = require('./utils');

if (nodeEnv === 'production') {
  const Sentry = require('@sentry/node');
  Sentry.init({
    dsn: sentryServerDSN,
    environment: microsEnv || 'development',
    release: microsServiceVersion,
  });

  process.on('uncaughtException', (error, origin) => {
    logger.error({
      ...errorToJson(error),
      origin,
    });
  });

  process.on('unhandledRejection', reason => {
    logger.error({
      ...errorToJson(reason),
      origin: 'unhandledRejection',
    });
  });
}

require('./create-server')().then(app => {
  app.listen(port, err => {
    if (err) console.log(err);
    console.log('Server connected on port: ', port);
  });
});
