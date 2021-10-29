import 'reflect-metadata';
import express, { ErrorRequestHandler } from 'express';
import { createConnection } from 'typeorm';
import compression from 'compression';
import bodyParser from 'body-parser';

import {
  createHealthcheckRouter,
  createStaticRouter,
  createApiRouter,
} from './routes';
import config from './db/config';
import { BitbucketClient } from './clients/bitbucket';
import { ServiceClient } from './clients/service';
import { SlackClient } from './clients/slack';
import { logger } from './utils/logger';
import { stats } from './utils/stats';
import { PRODUCTION } from './utils/env';

const PORT = 8080;

async function main() {
  const server = express();

  await createConnection(config);

  server.use(compression());
  server.use(bodyParser.json());

  server.use(createHealthcheckRouter());

  const bitbucketClient = new BitbucketClient();
  const serviceClient = new ServiceClient(bitbucketClient);
  const slackClient = new SlackClient();

  server.use(
    '/api',
    createApiRouter({ bitbucketClient, serviceClient, slackClient }),
  );

  if (PRODUCTION) {
    server.use(createStaticRouter());
  }

  server.use(((err, _, res, next) => {
    if (err) {
      logger.error({ err }, 'Unhandled express error');
      stats.increment('express_error');
      return res.status(500).send({
        error: err.message,
        stack: err.stack,
      });
    }
    next();
  }) as ErrorRequestHandler);

  server.listen(PORT, () => {
    logger.info('Server started');
  });
}

main().catch(err => {
  logger.error({ err }, 'Fatal error in main');
  stats.increment('fatal_error');
  process.exit(1);
});
