import axios from 'axios';
import chalk from 'chalk';
import { ProductBS } from '../../types';

type Status = 'running' | 'done' | 'timeout' | 'failed';

type BrowserstackBuild = {
  automation_build: {
    name: string;
    duration: number;
    status: Status;
    hashed_id: string;
    build_tag?: string;
  };
};

export type TestReported = {
  buildNumber: string;
  branch: string;
  buildType: string;
  duration: number;
  packageName: string;
  testFilePath: string;
  testFullName: string;
  testName: string;
  successTests?: number;
  failingTests?: number;
  failureMessage?: string;
};

/**
 * NOTE: This utility will update the tests statuses per build session.
 * It will also add / print the build session ID for easier reporting / debugging on Browserstack.
 *
 * @see https://api.browserstack.com/automate/builds.json
 *
 */
const user = process.env.BROWSERSTACK_USERNAME || '';
const key = process.env.BROWSERSTACK_KEY || '';

const browserstackBuildsUrl = (product: string) =>
  `https://api.browserstack.com/${product}/builds.json`;

export function isBrowserStackEnvironment() {
  const { TEST_ENV } = process.env;
  return TEST_ENV === 'browserstack' || TEST_ENV === 'browserstack_mobile';
}

export const getBrowserNameFromLabel = (browserLabel: string) => {
  const browsers = ['chrome', 'firefox', 'safari', 'edge'];
  const testBrowser = browserLabel
    ? browsers.find(browser => browserLabel.toLowerCase().includes(browser))
    : undefined;
  return testBrowser || 'browser not found';
};

async function getResponseData<T>(auth: string, url: string): Promise<T[]> {
  const response = await axios.get(url, {
    headers: {
      Authorization: `Basic ${auth}`,
    },
  });
  return response.data;
}

// This will get the last 10 builds.
async function getBuildId(
  auth: string,
  branch: string,
  url: string,
): Promise<string> {
  const buildsIds = (await getResponseData<BrowserstackBuild>(auth, url))
    .map(build => build.automation_build)
    .filter(
      build => build.name.includes(branch) && !build.name.includes('Archived'),
    );
  return buildsIds.length ? buildsIds[0].hashed_id : '';
}

export async function getBuildSession(branch: string, product: ProductBS) {
  const auth = Buffer.from(`${user}:${key}`).toString('base64');

  const buildUrl = browserstackBuildsUrl(product);

  const buildId = await getBuildId(auth, branch, buildUrl);

  if (!buildId) {
    console.log(
      chalk.yellow(
        `getBuildSession - No session found for branch: ${branch} & product: ${product}`,
      ),
    );
  }

  return buildId;
}
