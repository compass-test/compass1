/* eslint-disable global-require */
/* eslint-disable camelcase */
const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const Sentry = require('@sentry/node');
const next = require('next');
const logger = require('./logger');
const { errorToJson } = require('./utils');
const Contributor = require('../db/models/contributor');
const PullRequest = require('../db/models/pull-request');
const { nodeEnv, microsServiceVersion } = require('../config');

module.exports = async function createServer() {
  const nextApp = next({
    dev: nodeEnv !== 'production',
  });

  await nextApp.prepare();

  const app = express();
  const nextHandler = nextApp.getRequestHandler();

  if (nodeEnv === 'production') {
    app.use(
      morgan((tokens, req, res) =>
        JSON.stringify({
          // https://github.com/expressjs/morgan#using-a-custom-format-function
          method: tokens.method(req, res),
          url: tokens.url(req, res),
          status: tokens.status(req, res),
          contentLength: tokens.res(req, res, 'content-length'),
          responseTimeMs: Number(tokens['response-time'](req, res)),
        }),
      ),
    );
  } else {
    app.use(
      morgan('dev', {
        skip: req =>
          req.path.startsWith('/_next/webpack-hmr') ||
          req.path.endsWith('.hot-update.json'),
      }),
    );
  }

  app.use((req, res, _next) => {
    res.set('X-Micros-Service-Version', microsServiceVersion || 'development');
    _next();
  });

  app.use(bodyParser.json());
  app.use(Sentry.Handlers.requestHandler());

  app.get('/healthcheck', (_, res) => {
    res.sendStatus(200);
  });

  app.post('/api/pull-requests/pending-signees', async (req, res) => {
    const { externalIDs, externalEmails } = req.body;

    const [IDs, emails] = await Contributor.getSignedFromSubset(
      externalIDs,
      externalEmails,
    );

    res.status(200).json({
      IDs,
      emails,
    });
  });

  app.post('/api/pull-requests/:number', async (req, res) => {
    const { repo_owner, repo_name, ...rest } = req.body;

    const result = await PullRequest.insertOrUpdate(
      { number: Number(req.params.number), repo_owner, repo_name },
      {
        ...rest,
      },
    );

    res.status(201).json(result);
  });

  app.patch('/api/pull-requests/:number', async (req, res) => {
    const { repo_owner, repo_name, ...rest } = req.body;

    await PullRequest.updateByCompositeKey(
      { number: Number(req.params.number), repo_owner, repo_name },
      {
        ...rest,
      },
    );

    res.sendStatus(200);
  });

  // Currently only allowing the cron resource to call, could add functionality on internal ui to revoke from list
  // Note: Must be before /api/contributor/:type
  app.post('/api/contributor/revoke', async (req, res) => {
    if (
      req.body.users != null &&
      Array.isArray(req.body.users) &&
      req.body.users.length > 0
    ) {
      const numberOfUsersRevoked = await Contributor.removeUsers(
        req.body.users,
      );
      res.sendStatus(201).json({ numberOfUsersRevoked });
    } else {
      res
        .status(400)
        .send('invalid parameters, must be a list of github user names');
    }
  });

  app.post('/api/contributor/:type', async (req, res) => {
    for (const contributor of req.body) {
      const created = await Contributor.createOrUpdate(contributor);

      if (!created) {
        res.sendStatus(500);
        return;
      }
    }

    res.sendStatus(201);
  });

  app.get('/api/pull-requests/user', async (req, res) => {
    const { email, githubID } = req.query;

    const pullRequests = await PullRequest.getPRsAssociatedWithUser(
      email,
      githubID,
    );

    res.status(200).json({ pullRequests });
  });

  app.all('*', nextHandler);
  app.use(Sentry.Handlers.errorHandler());
  app.use((err, req, res) => {
    res.status(500);

    logger.error({
      ...errorToJson(err),
      sentryId: res.sentry,
      origin: 'errorHandler',
    });

    if (
      req.path.startsWith('/resources') ||
      req.path.startsWith('/api') ||
      req.get('Accept').includes('application/json')
    ) {
      res.json({
        message: 'Internal Server Error',
        sentryId: res.sentry,
      });
    } else {
      res.send(`Internal Server Error. ID: ${res.sentry}`);
    }
  });

  return app;
};
