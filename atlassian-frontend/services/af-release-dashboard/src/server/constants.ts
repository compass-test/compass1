import path from 'path';
import axios from 'axios';

export const PORT = 8080;
export const STATIC_ASSETS_PATH =
  process.env.LOCAL === 'true'
    ? path.join(__dirname, '../../dist/static')
    : path.join(__dirname, '../static');

export const STATUS = {
  SUCCESS: 'success',
  ERROR: 'error',
  RECEIVED: 'received',
};
export const BASE_API = '/api/v1';

export enum ENVIRONMENT {
  LOCALHOST = 'localhost',
  STAGING = 'staging',
  PROD = 'production',
}

export const getEnvironment = () => {
  if (
    process.env.NODE_ENV === 'development' ||
    process.env.NODE_ENV === 'test'
  ) {
    return ENVIRONMENT.LOCALHOST;
  }
  if (process.env.MICROS_ENV === 'dev-west2') {
    return ENVIRONMENT.PROD;
  }
  if (process.env.MICROS_ENV === 'ddev') {
    return ENVIRONMENT.STAGING;
  }

  // Some scripts are run in CI Pipelines (outside of the actual Micros environment)
  // so we have these secondary checks to make this method more flexible.
  if (process.env.CI) {
    console.warn(
      `Because this is running in CI we're using RELEASE_DASHBOARD_URL instead of MICROS_ENV to determine the environment.`,
    );
    const dashboardUrl = process.env.RELEASE_DASHBOARD_URL;
    if (dashboardUrl === serviceUrl(ENVIRONMENT.STAGING)) {
      return ENVIRONMENT.STAGING;
    }
    if (dashboardUrl === serviceUrl(ENVIRONMENT.PROD)) {
      return ENVIRONMENT.PROD;
    }
  }

  console.error('Could not identify environment. Falling back to localhost.');
  return ENVIRONMENT.LOCALHOST;
};

export const serviceUrl = (env?: ENVIRONMENT) => {
  switch (env || getEnvironment()) {
    case ENVIRONMENT.LOCALHOST:
      return 'http://localhost:8080';
    case ENVIRONMENT.STAGING:
      return 'https://af-release-dashboard.ap-southeast-2.dev.atl-paas.net';
    case ENVIRONMENT.PROD:
      return 'https://af-release-dashboard.us-west-2.dev.atl-paas.net';
  }
};

export const client = axios.create({
  baseURL: serviceUrl(),
  timeout: 10000,
});

export const AF_RELEASE_DASHBOARD_API_BASE_URL = `${serviceUrl()}/${BASE_API}`;
export const AF_RELEASE_DASHBOARD_REGISTER_API_URL = `${AF_RELEASE_DASHBOARD_API_BASE_URL}/register/pull_request`;

// Bitbucket APIs
export const BITBUCKET_COMMITS_URL =
  'https://api.bitbucket.org/2.0/repositories/atlassian/atlassian-frontend/commits';
export const getCommitURL = (commitHash: string): string =>
  `https://api.bitbucket.org/2.0/repositories/atlassian/atlassian-frontend/commit/${commitHash}`;
export const BITBUCKET_PULL_REQUESTS_URL =
  'https://api.bitbucket.org/2.0/repositories/atlassian/atlassian-frontend/pullrequests';

// Page size used when requesting commits
export const COMMITS_PAGE_LENGTH = 30;

// Page size used when requesting merged PRs
export const PULL_REQUESTS_PAGE_LENGTH = 30;

// Maximum elapsed time before avoiding querying build results
export const PAGINATION_THRESHOLD_IN_HOURS = 60; // 2.5 days

/**
 * These values are used for calculating how long it takes for a commit to move from `develop`
 * to when it's deployed to Product Fabric.
 *
 * The basic flow of the Product Integrator:
 *
 * 1. A pull request merges into `develop`.
 * 2. A pipeline `build-and-branch-deploy-packages` is triggered to build the packages
 *    and publish them to our private NPM repository.
 * 3. A pipeline `product-integrator-build` is run asynchronously at the end of the above one
 *    to synchronise the newly published pre-release packages across into the confluence-frontend
 *    repository.
 * 4. A Bamboo plan is triggered by the new commit in confluence-frontend (from the above step)
 *    to build and deploy the Confluence artefacts. Once completed, the build is available on
 *    product-fabric.
 *
 * Example sequence of events for `f4bb7dca56a3`:
 * 1. https://bitbucket.org/atlassian/atlassian-frontend/commits/f4bb7dca56a3
 * 2. https://bitbucket.org/atlassian/atlassian-frontend/addon/pipelines/home#!/results/261368
 * 3. https://bitbucket.org/atlassian/atlassian-frontend/addon/pipelines/home#!/results/261439
 * 4. https://confluence-cloud-bamboo.internal.atlassian.com/browse/CONFMICRO-CFCPB14350-BUILDBRANCH-210
 *
 * NOTES:
 * - Average duration in minutes that a pipeline takes to complete in CI.
 * - These are manually scraped values. They may change over time.
 * - There may be additional delays before a pipeline is triggered between these steps.
 */
const AVG_BUILD_AND_DELOY_IN_MINUTES = Object.values({
  'pipeline-build-and-branch-deploy-packages': 15,
  'pipeline-product-integrator-build': 30,
  'confluence-bamboo-build-and-deploy': 15,
}).reduce((a: number, b: number) => a + b);

// Additional time to reduce the risk of a temporary false negative (stale) state.
// This occassionally occurs when the Product Integrator triggers an async Bamboo build,
// but for reasons unknown, the build fails to start.
//
// This results in the latest commit not being deployed, which remains the case until a
// new PR merges, or someone manually runs the build to account for the missing deployment.
//
// Note: by increasing the buffer time we delay notifying the RM when the branch is stale.
// We do this to prevent crying wolf unnecessarily, as real-world data shows it usually
// fixes itself on subsequent merged PRs (unless legitimately broken).
const TEMPORARY_ADDITIONAL_BUFFER_TIME_IN_HOURS = 2;

/**
 * Grace period we allow for a merged PR to get built & deployed to PF before we mark PF as stale.
 *
 * On average it takes an hour, so we double it to allow for delays.
 */
export const DEPLOYMENT_GRACE_PERIOD_IN_HOURS =
  (AVG_BUILD_AND_DELOY_IN_MINUTES / 60) * 2 +
  TEMPORARY_ADDITIONAL_BUFFER_TIME_IN_HOURS;
