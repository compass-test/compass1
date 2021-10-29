const path = require('path');
const fs = require('fs');
const querystring = require('querystring');
// eslint-disable-next-line import/no-extraneous-dependencies
const fetch = require('node-fetch');

const extras = {
  // get number of teams defined in `teams.json` file
  teams: async (cwd) => {
    const teamsPath = path.join(cwd, 'teams.json');
    const teamsFile = fs.readFileSync(teamsPath);
    return Object.keys(JSON.parse(teamsFile)).length;
  },

  // get number of merged pull requests in `atlassian-frontend` repository
  pullrequests: async (cwd, config) => {
    const username = process.env.USERNAME;
    const password = process.env.PASSWORD;
    const auth = Buffer.from(`${username}:${password}`).toString('base64');

    let query = 'state="merged"';

    if (config.timestamp) {
      query += ` and updated_on<=${new Date(
        config.timestamp * 1000,
      ).toISOString()}`;
    }

    const encoded = querystring.encode({ q: query });
    const url = `https://api.bitbucket.org/2.0/repositories/atlassian/atlassian-frontend/pullrequests?${encoded}`;

    const response = await fetch(url, {
      headers: {
        Authorization: `basic ${auth}`,
      },
    });

    if (!response.ok) {
      throw new Error('could not get pullrequests from bitbucket');
    }

    const json = await response.json();
    return json.size;
  },
};

const config = {
  // analytics product, required
  product: 'atlaskit',

  // repository clone url to get historical data with, required when `--backfill` flag set
  repository: 'git@bitbucket.org:atlassian/atlassian-frontend.git',

  // send analytics to prod or staging servers, default false
  prod: process.env.NODE_ENV === 'production',

  // set how long ago counts as recent for calculations of recentCommits and recentAuthors
  // default: 2592000 (30 days in seconds)
  recent: 2592000,

  // enable total workspaces statistic and individual workspaces statistics
  workspaces: true,

  // extra statistics to calculate on the repository
  // each function is an async function with the parameter `cwd` to targeted path
  extras,

  // settings for backfill, backfill can only be enabled using `--backfill` flag
  backfill: {
    // set how many days to run the backfill for, default 30
    days: 420,

    // set the period of historical statistics to calculate, e.g 1 is everyday, 7 is everyweek
    // default 1
    period: 30,
  },
};

module.exports = config;
