#!/usr/bin/env node
const axios = require('axios');
const pWaitFor = require('p-wait-for');
const retry = require('async-retry');
/*
   This script is a stop gap solution until this code is moved into landkid.
   It simply waits until there is no build running in master.
   We run this at the end of a landkid build so that we never merge a PR whilst
   master is still running.
*/
const numberOfTries = 3;
const BUILDS_PER_PAGE = 30;
const timeLabel = 'Checking if master is running';
const loggedPipelineUrls = new Map();
const {
  BITBUCKET_REPO_FULL_NAME,
  BITBUCKET_USER,
  BITBUCKET_PASSWORD,
} = process.env;

if (!BITBUCKET_REPO_FULL_NAME || !BITBUCKET_USER || !BITBUCKET_PASSWORD) {
  throw Error(
    '$BITBUCKET_REPO_FULL_NAME or $BITBUCKET_USER or $BITBUCKET_PASSWORD environment variables are not set',
  );
}

const axiosRequestConfig = {
  auth: {
    username: BITBUCKET_USER,
    password: BITBUCKET_PASSWORD,
  },
  params: {
    pagelen: BUILDS_PER_PAGE,
    // get the most recent builds first
    sort: '-created_on',
    'target.ref_name': 'master',
    'target.ref_type': 'BRANCH',
  },
};

function noMasterRunning() {
  console.timeLog(timeLabel, +new Date());
  // We add a queryString to ensure we dont get cached responses
  return axios
    .get(
      `https://api.bitbucket.org/2.0/repositories/${BITBUCKET_REPO_FULL_NAME}/pipelines/?${+new Date()}`,
      axiosRequestConfig,
    )
    .then(response => {
      const allPipelines = response.data.values;
      const runningPipelines = allPipelines
        .filter(
          pipeline =>
            pipeline.state.name === 'IN_PROGRESS' ||
            pipeline.state.name === 'PENDING',
        )
        // Filter to only default builds run on 'push'.
        // Allow manual trigger from master by the afp-bot in case of `master` pipelines needed to be restarted.
        // Exclude custom build that are triggered manually like services.
        .filter(
          job =>
            job.trigger.name !== 'SCHEDULE' &&
            job.target.selector.type !== 'custom',
        );

      const ready = runningPipelines.length === 0;
      if (ready) {
        console.timeEnd(timeLabel);
      } else {
        const { build_number: buildNumber } = runningPipelines[0];
        if (!loggedPipelineUrls.has(buildNumber)) {
          const pipelineUrl = `https://bitbucket.org/atlassian/atlassian-frontend/addon/pipelines/home#!/results/${buildNumber}`;
          console.log(`Waiting for pipeline to finish: ${pipelineUrl}`);
          loggedPipelineUrls.set(buildNumber, pipelineUrl);
        }
      }

      return ready;
    });
}

// Start tracking time
console.time(timeLabel);
console.log(
  'Waiting until there is no default master build running so that we can merge...',
);

if (require.main === module) {
  retry(
    () => {
      // if anything throws, we retry
      return pWaitFor(noMasterRunning, { interval: 30000 });
    },
    {
      minTimeout: 10000,
      onRetry: e => console.log(e),
      retries: numberOfTries,
    },
  ).catch(err => {
    console.error(
      `Even after the ${numberOfTries} tries, it fails with: ${err}`,
    );
    process.exit(1);
  });
}
