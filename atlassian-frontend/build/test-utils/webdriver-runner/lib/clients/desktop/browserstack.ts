/*
 * util module to support connect and disconnect from browserstack.
 */

import browserstack from 'browserstack-local';
import ora from 'ora';
import chalk from 'chalk';

const bsLocal = new browserstack.Local();
const bsKey = process.env.BROWSERSTACK_KEY;

// The session identifier is what you see on the browserstack dashboard.
export function getSessionIdentifier() {
  const {
    BITBUCKET_BRANCH,
    BITBUCKET_PARALLEL_STEP,
    BITBUCKET_PIPELINE_UUID,
    CI,
    USER,
    LANDKID,
  } = process.env;
  let id = BITBUCKET_BRANCH || '';
  if (!BITBUCKET_BRANCH && USER) {
    id = `${USER}_local_run`;
  }
  if (LANDKID) {
    id = `Landkid`;
  }
  // In case of running the build in parallel,
  // the `BUILD_BRANCH_NAME` needs to be differentiated in Browserstack to avoid any unique identifier issue.
  if (BITBUCKET_PARALLEL_STEP) {
    id = `${id}_${BITBUCKET_PARALLEL_STEP}`;
  }
  // In order to differiate each build session in BrowserStack, we are adding the `BITBUCKET_PIPELINE_UUID` to make it unique and easier to log and find in the dashboard.
  // This applies only in CI.
  if (BITBUCKET_PIPELINE_UUID && CI) {
    // We need to sanitize the UUID because of curly brackets.
    const uuid = BITBUCKET_PIPELINE_UUID.replace('{', '')
      .replace('}', '')
      .trim();
    id = `${id}_${uuid}`;
  }
  return id;
}

/**
 * The local identifier should be unique per connected session to BrowserStack,
 * otherwise subsequent connections using the same ID result in cancelling the
 * previous ones.
 *
 * Locally, this is less of an issue as typically developers run their test suites
 * one at a time rather than in parallel.
 *
 * In CI, this could happen frequently as developers push new commits to their
 * branches, or when splitting tests across multiple parallel steps within the
 * same Pipeline.
 *
 * To ensure uniqueness in CI, `LOCAL_IDENTIFIER` is defined as the timestamp of
 * the Pipeline build, coupled with the unique commit hash and paralell step index.
 *
 * - `BITBUCKET_COMMIT` is the Commit SHA from Pipelines.
 *      e.g. `BITBUCKET_COMMIT=c4d70cc`
 * - `BITBUCKET_PARALLEL_STEP` is the Parallel Step index from Pipelines.
 *      e.g. `BITBUCKET_PARALLEL_STEP=1`.
 * - `LOCAL_IDENTIFIER` is the timestamp when the Pipeline began.
 *      e.g. `LOCAL_IDENTIFIER=$(date +%s) # 1616540855`
 */
export function getLocalIdentifier() {
  const {
    CI,
    BITBUCKET_COMMIT,
    LOCAL_IDENTIFIER,
    BITBUCKET_PARALLEL_STEP,
    USER,
  } = process.env;
  if (CI) {
    // Unique CI pipeline ID e.g. `c4d70cc_1616540855` or `c4d70cc_1616540855_2`
    return `${BITBUCKET_COMMIT || 'COMMIT'}_${LOCAL_IDENTIFIER || 'LOCAL_ID'}${
      BITBUCKET_PARALLEL_STEP ? `_${BITBUCKET_PARALLEL_STEP}` : ''
    }`;
  }

  // Local developers machine name e.g. `jdoe`
  return USER || 'UnknownUser';
}

export async function startServer() {
  const spinner = ora(chalk.cyan('Connecting to BrowserStack')).start();
  return new Promise((resolve, reject) => {
    const localIdentifier = getLocalIdentifier();
    bsLocal.start(
      { key: bsKey, localIdentifier, forceLocal: true },
      // eslint-disable-next-line consistent-return
      error => {
        if (error) {
          spinner.fail(
            chalk.red(`Failed to connect to BrowserStack: ${error}`),
          );
          return reject(error);
        }
        if (localIdentifier) {
          spinner.succeed(
            chalk.cyan(
              `Connected to BrowserStack with identifier: ${localIdentifier}`,
            ),
          );
        }
        if (bsLocal.isRunning()) {
          resolve();
        } else {
          const msg = 'BrowserStack local connection is no longer running';
          spinner.fail(chalk.red(msg));
          reject(new Error(msg));
        }
      },
    );
  });
}

export function stopServer() {
  if (bsLocal.isRunning()) {
    console.log('Disconnecting from BrowserStack');
    bsLocal.stop(() => {});
  }
}
