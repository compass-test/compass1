/* Script to send bundle size data to Redash through Analytics pipeline. */
import fs from 'fs';
import path from 'path';
import { analyticsClient } from '@atlassiansox/analytics-node-client';

export type Config = {
  prod?: string;
};

export type BundleSizeEvent = {
  team: string;
  package: string;
  version: string;
  bitbucketBranch: string;
  targetBranch: string;
  mergeBaseCommit: string;
  mainPkg: boolean;
  dependent: boolean;
  id: string;
  name: string;
  stats: { size: number; gzipSize: number };
};

async function sendAnalytics(
  analyticsEvents: BundleSizeEvent[],
  config: Config,
) {
  const analyticsEnv = config.prod ? 'prod' : 'dev';
  const client = analyticsClient({
    env: analyticsEnv,
    product: 'atlaskit',
  });

  await Promise.all(
    analyticsEvents.map((event) => {
      return client.sendTrackEvent({
        anonymousId: 'unknown',
        trackEvent: {
          tags: ['atlaskit'],
          source: 'sending.bundle.size.analytics.js',
          action: 'computed',
          actionSubject: 'bundle-size',
          attributes: event,
          origin: 'console',
          platform: 'bot',
        },
      });
    }),
  );
}

const prepareData = (pathToFolder: string) => {
  if (!pathToFolder || pathToFolder === '') {
    return;
  }
  try {
    const files = fs.readdirSync(pathToFolder);
    if (files.length === 0 || !files) {
      return;
    }
    const properties = [];
    for (const file of files) {
      try {
        const content = JSON.parse(
          fs.readFileSync(path.join(pathToFolder, file), 'utf8'),
        );
        properties.push(content);
      } catch (err) {
        console.log(`${err}`);
      }
    }
    // We flatten the data to one dimension array of bundle size object data per package.
    // See measure tool for the output or the bundle size doc on the website:
    // https://developer.atlassian.com/cloud/framework/atlassian-frontend/development/performance/00-bundle-size/#what-is-the-most-important-information-in-a-bundle-size-measurement-.
    // eslint-disable-next-line consistent-return
    return properties.reduce((acc, val) => acc.concat(val), []);
  } catch (err) {
    console.log(`${err}`);
  }
};

async function main() {
  const bundleSizeData =
    prepareData(path.join(process.cwd(), '.masterBundleSize')) || []; // By default, it will be an empty array to avoid Flow issues.
  return sendAnalytics(bundleSizeData, { prod: process.env.CI });
}

if (require.main === module) {
  main()
    .then(() => {
      console.log(`Sent bundle size data to Redash`);
    })
    .catch((err) => {
      console.log(`Something went wrong while sending data: ${err}`);
      process.exit(1);
    });
}
