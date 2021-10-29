## Config

### CLI Parameters

`--config` path to config file [default: `./repo-stats.config.js`]
`--timestamp` get statistics from this time instead of current time (make sure local git state matches this)
`--backfill` get historical repository statistics
`--remote` get stats for a separate remote repository
`--dry-run` save statistics to disk instead of sending to analytics

### Config File Settings

all config file settings

```js
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
    days: 30,

    // set the period of historical statistics to calculate, e.g 1 is everyday, 7 is everyweek
    // default 1
    period: 1,
  },
};

module.exports = config;
```

#### Extra Statistics

`extras` is a on object containing functions to calculate extra statistics on the repository.
Each function is an async function with the parameters `cwd` to the targeted path, and `config` an object containing all the config settings.

example:

```js
const path = require('path');
const fs = require('fs');

const extras = {
  // get number of teams defined in `teams.json` file
  teams: async cwd => {
    const teamsPath = path.join(cwd, 'teams.json');
    const teamsFile = fs.readFileSync(teamsPath);
    return Object.keys(JSON.parse(teamsFile)).length;
  },
};
```

## Backfill Historical Statistics

You can calculate and send historical data from the repository using `--backfill` flag or setting `backfill.enabled` to `true` in the config file.

Backfill clones the repository into `backfill/{timestamp}` where it can checkout different commits to get historical statistics from the repo.

## Remote Statistics

You can calculate and send stats from a repository using `--remote` flag.

Remote clones the repository into `repo-stats-remote/{repo name}` where it will check out the latest default branch from the repository.

Expected environment variables for the various repositories are:

Stash: `STASH_USER` and `STASH_TOKEN`

Tokens has to be url-encoded as the script does not do any encoding of token to prevent leaking through CI pipelines.

### Redash

Production events sent to redash can be queried from the `cloud.event_track` table

Local, Dev, Staging events sent to redash can be queried from the `raw_dlf_stg.event_track` table (30 day retention)

### Splunk

Production query

`eventtype="micros_analytics-service" env="prod-*" m.t="application" message="Analytics event*" ext.event.type="track" ext.event.product="atlaskit" ext.event.action="updated"`

Local, Development, Staging query

`eventtype="micros_analytics-service" env="stg-*" m.t="application" message="Analytics event*" ext.event.type="track" ext.event.product="atlaskit" ext.event.action="updated"`
