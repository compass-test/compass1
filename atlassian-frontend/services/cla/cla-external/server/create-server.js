/* eslint-disable camelcase */
const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const fetch = require('node-fetch');
const Sentry = require('@sentry/node');
const next = require('next');
const { Octokit } = require('@octokit/rest');
const { retry } = require('@octokit/plugin-retry');
const { throttling } = require('@octokit/plugin-throttling');
const { createAppAuth } = require('@octokit/auth-app');
const logger = require('./logger');
const { errorToJson } = require('./utils');
const {
  botID,
  githubOrg1,
  githubOrg2,
  githubOrg3,
  githubOrg4,
  org1InstallationID,
  org2InstallationID,
  org3InstallationID,
  org4InstallationID,
  botKey,
  serviceURL,
  CLAInternalURL,
  microsServiceVersion,
  nodeEnv,
} = require('../config');

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
          req.path.startsWith('/_next/static') ||
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

  app.get('*', (req, res, _next) => {
    if (
      req.path === '/cla' ||
      req.path === '/corporate' ||
      req.path === '/individual' ||
      req.path.startsWith('/_next')
    ) {
      _next();
    } else {
      res.redirect('https://developer.atlassian.com/platform/open-source/');
    }
  });

  app.post('/contributor/individual', async (req, res) => {
    const { github_name } = req.body;
    const username = github_name.trim().toLowerCase();
    const email = req.body.email.trim().toLowerCase();

    let githubID;

    try {
      githubID = await getGithubID(username);

      if (githubID === null) {
        res.status(404).json({
          errorMessage: `Github user not found: ${username}`,
        });
        return;
      }
    } catch (e) {
      res.status(500).json({
        errorMessage: e.message,
      });
      return;
    }

    const saveToDb = fetch(`${CLAInternalURL}/api/contributor/individual`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-SLAuth-Egress': true,
      },
      body: JSON.stringify([
        {
          ...req.body,
          email,
          github_id: githubID,
        },
      ]),
    });

    const usernamesToRemove = new Set([username]);
    const IDsToRemove = new Set([githubID]);
    const emailsToRemove = new Set([email]);

    const saveRecordAndUpdatePRs = await Promise.allSettled([
      saveToDb,
      updatePRsAssociatedWithUser(
        email,
        githubID,
        IDsToRemove,
        usernamesToRemove,
        emailsToRemove,
      ),
    ]);

    for (const { status, reason, value } of saveRecordAndUpdatePRs) {
      if (status === 'rejected') {
        logger.error({
          type: 'form_submit',
          value: reason.message,
        });

        res.status(500).json({
          errorMessage:
            'Internal Server Error. Please email us for assistance.',
        });
        return;
      }

      if (value && value.status === 500) {
        res.status(500).json({
          errorMessage:
            'Are you attempting to update an existing contributor record? If so, please email us with your details.',
        });

        return;
      }
    }

    res.sendStatus(200);
  });

  app.post('/contributor/corporate', async (req, res) => {
    const {
      corporation_name,
      address,
      point_of_contact_first_name,
      point_of_contact_last_name,
      point_of_contact_email,
      point_of_contact_title,
      signee_first_name,
      signee_last_name,
      signee_title,
      schedule_b,
    } = req.body;

    const sharedFields = {
      corporation_name,
      address,
      point_of_contact_first_name,
      point_of_contact_last_name,
      point_of_contact_email,
      point_of_contact_title,
      signee_first_name,
      signee_last_name,
      signee_title,
      schedule_b,
      is_corporation: true,
    };

    const contributors = [];
    const contributorMap = new Map();

    for (const [key, value] of Object.entries(req.body)) {
      if (
        key.startsWith('github_name_') ||
        key.startsWith('first_name_') ||
        key.startsWith('last_name_') ||
        key.startsWith('email_')
      ) {
        const index = key.charAt(key.length - 1);
        const contributor = contributorMap.get(index) || {};
        const reformattedKey = key.slice(0, key.lastIndexOf('_'));
        contributor[reformattedKey] = value;
        contributorMap.set(index, contributor);
      }
    }

    const invalidUsernames = [];
    const usernamesToRemove = new Set();
    const IDsToRemove = new Set();
    const emailsToRemove = new Set();

    for (const contributor of contributorMap.values()) {
      const { github_name } = contributor;
      const username = github_name.trim().toLowerCase();
      const email = contributor.email.trim().toLowerCase();

      let id;

      try {
        id = await getGithubID(username);

        if (id === null) {
          invalidUsernames.push(username);
        } else {
          usernamesToRemove.add(username);
          IDsToRemove.add(id);
          emailsToRemove.add(email);
          contributors.push({
            ...sharedFields,
            ...contributor,
            email,
            github_id: id,
          });
        }
      } catch (e) {
        res.status(500).json({
          errorMessage: e.message,
        });

        return;
      }
    }

    if (invalidUsernames.length > 0) {
      res.status(404).json({
        errorMessage: `Github user(s) not found: ${invalidUsernames}`,
      });

      return;
    }

    const saveToDb = fetch(`${CLAInternalURL}/api/contributor/corporate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-SLAuth-Egress': true,
      },
      body: JSON.stringify(contributors),
    });

    const saveRecordsAndUpdatePRs = await Promise.allSettled([
      saveToDb,
      ...contributors.map(({ email, github_id }) => {
        return updatePRsAssociatedWithUser(
          email,
          github_id,
          IDsToRemove,
          usernamesToRemove,
          emailsToRemove,
        );
      }),
    ]);

    for (const { status, reason, value } of saveRecordsAndUpdatePRs) {
      if (status === 'rejected') {
        logger.error({
          type: 'form_submit',
          value: reason.message,
        });

        res.status(500).json({
          errorMessage:
            'Internal Server Error: Please email us for assistance.',
        });

        return;
      }

      if (value && value.status === 500) {
        res.status(500).json({
          errorMessage:
            'Are you attempting to update an existing contributor record? If so, please email us with your details.',
        });

        return;
      }
    }

    res.sendStatus(200);
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
      res.send(`Internal Server Error. ID:  + ${res.sentry}`);
    }
  });

  return app;
};

const orgToInstallation = new Map([
  [githubOrg1, org1InstallationID],
  [githubOrg2, org2InstallationID],
  [githubOrg3, org3InstallationID],
  [githubOrg4, org4InstallationID],
]);

const getOctokit = org => {
  const OctokitWithPlugins = Octokit.plugin(retry, throttling);
  return new OctokitWithPlugins({
    authStrategy: createAppAuth,
    auth: {
      appId: botID,
      privateKey: botKey,
      installationId: orgToInstallation.get(org),
    },
    throttle: {
      onRateLimit: (retryAfter, options) => {
        logger.warn({
          type: 'rate_limit_reached',
          value: `Request quota exhausted for request ${options.method} ${options.url}`,
        });

        if (options.request.retryCount < 3) {
          logger.info({
            type: 'retry_request',
            value: `Retrying after ${retryAfter} seconds!`,
          });
          return true;
        }
        return false;
      },
      onAbuseLimit: (_, options) => {
        logger.warn({
          type: 'abuse_limit_reached',
          value: `Abuse detected for request ${options.method} ${options.url}`,
        });
      },
    },
  });
};

const getGithubID = async login => {
  const octokit = getOctokit(githubOrg4);

  try {
    const { data } = await octokit.users.getByUsername({
      username: login,
    });

    return data.id;
  } catch (e) {
    if (e.status === 404) return null;

    logger.error({
      type: 'get_github_id',
      value: e.message,
    });

    throw e;
  }
};

const updatePRsAssociatedWithUser = async (
  email,
  githubID,
  IDsToRemove,
  usernamesToRemove,
  emailsToRemove,
) => {
  const getPRs = await fetch(
    `${CLAInternalURL}/api/pull-requests/user?githubID=${githubID}&email=${email}`,
    {
      headers: {
        'Content-Type': 'application/json',
        'X-SLAuth-Egress': true,
      },
    },
  );

  const { pullRequests } = await getPRs.json();

  for (const {
    number,
    repo_owner,
    repo_name,
    commit_sha,
    comment_id,
    github_ids,
    github_names,
    emails,
  } of pullRequests) {
    const updatedEmailList = emails.filter(e => !emailsToRemove.has(e));
    const updatedIDList = github_ids.filter(id => !IDsToRemove.has(id));
    const updatedUsernameList = github_names.filter(
      username => !usernamesToRemove.has(username),
    );

    await fetch(`${CLAInternalURL}/api/pull-requests/${number}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'X-SLAuth-Egress': true,
      },
      body: JSON.stringify({
        repo_owner,
        repo_name,
        github_ids: updatedIDList,
        github_names: updatedUsernameList,
        emails: updatedEmailList,
      }),
    });

    const botOctokit = getOctokit(repo_owner);

    if (updatedEmailList.length || updatedIDList.length) {
      const loginsAndEmails = updatedUsernameList.concat(updatedEmailList);
      const loginsOrEmails = loginsAndEmails
        .map(loginOrEmail => `❌${loginOrEmail}\n`)
        .join('');

      await botOctokit.issues.updateComment({
        owner: repo_owner,
        repo: repo_name,
        comment_id,
        body: `Thank you for your submission! Like many open source projects, we ask that you sign our <a href=${serviceURL}>CLA (Contributor License Agreement)</a> before we can accept your contribution.
          <strong>If your email is listed below</strong>, please ensure that you sign the CLA with the <strong>same email address</strong>.</br>
          <strong>The following users still need to sign our CLA:</strong></br>${loginsOrEmails}<p><sub>Already signed the CLA? To re-check, try refreshing the page.</sub><p>`,
      });

      await botOctokit.repos.createCommitStatus({
        owner: repo_owner,
        repo: repo_name,
        sha: commit_sha,
        state: 'pending',
        target_url: serviceURL,
        context: 'CLA',
        description:
          'Merging is blocked until the CLA has been signed by all external contributors.',
      });
    } else {
      await botOctokit.issues.updateComment({
        owner: repo_owner,
        repo: repo_name,
        comment_id,
        body: 'Hooray! All contributors have signed the CLA.',
      });

      await botOctokit.repos.createCommitStatus({
        owner: repo_owner,
        repo: repo_name,
        sha: commit_sha,
        state: 'success',
        target_url: serviceURL,
        context: 'CLA',
        description: 'Hooray! All contributors have signed the CLA.',
      });
    }
  }
};
