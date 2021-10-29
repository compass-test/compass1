import meow from 'meow';

import * as webpack from './lib/bundle/desktop-webpack-config';
import { processAnalyticsForTestResults } from '@atlaskit/build-reporting';

import { runTestsWithRetry } from './lib/runner/jest-runner';
import { getDefaultFlags } from './lib/runner/flags';
import { logBrowserstackBuildSessionUrl } from './lib/reporting/browserstack-reporter';
import { generateArtifacts } from './utils/create-artifact';
import modifiers from './lib/reporting/modifiers';
import type { TestSuiteResponse } from './lib/runner/jest-runner';
import type { Flags } from './lib/runner/flags';

const USAGE = `
  Usage
    $ yarn test:webdriver <[paths]> | <[pkgs]>
    $ yarn test:webdriver:browserstack <[paths]> | <[pkgs]>

  Options
    --testDir
    --help                   Prints usage commands & example
    --debug, -d              Runs tests in non-headless Chromium
    --watch, -w              Run WD tests in watch mode
    --retry=<n>, -r          Retry failed WD tests <n> times
    --updateSnapshot, -u     Update snapshot files
    --listTests              List all WD tests
    --json                   Prints the test results in JSON
    --gracefulExit           Ignores test failures and exists with code 0 gracefully

  Examples
    $ yarn test:webdriver:browserstack editor-core --updateSnapshot
    $ yarn test:webdriver packages/editor/renderer/src/__tests__/integration/copy.ts --debug
    $ yarn test:webdriver editor-common packages/editor/editor-core/src/__tests__/integration/emoji/emoji-1.ts
    $ yarn test:webdriver --listTests --json
  `;

interface InitClientOptions {
  browserstack: boolean;
  mobile: boolean;
  listTests?: boolean;
}

function initClient(options: InitClientOptions) {
  if (options.browserstack || options.mobile) {
    return require('./lib/clients/desktop/browserstack');
  }

  if (options.listTests) {
    return {
      startServer: () => {},
      stopServer: () => {},
    };
  }
  return require('./lib/clients/desktop/chrome-driver');
}

function parseChanged(changed: string): string[] | undefined {
  try {
    const raw = JSON.parse(changed);
    if (Array.isArray(raw)) {
      return raw.filter(item => typeof item === 'string' && item !== '');
    }
  } catch {
    return undefined;
  }
}

/*
 * function main() to
 * start and stop webpack-dev-server, selenium-standalone-server, browserstack connections
 * and run and wait for webdriver tests complete.
 *
 * By default the tests are running headlessly, set HEADLESS=false if you want to run them directly on real browsers.
 */
export default async function main(
  userFlags: Partial<Flags>,
  testPaths: string[],
): Promise<TestSuiteResponse> {
  const defaultFlags = getDefaultFlags();
  const flags: Flags = { ...defaultFlags, ...userFlags };

  if (flags.help) {
    console.log(USAGE);
    return { exitCode: 0, results: [] };
  }

  process.env.NODE_ENV = 'test';
  process.env.INTEGRATION_TESTS = 'true';

  const isBrowserStack = flags.testEnv === 'browserstack';
  const isBrowserStackMobile = flags.testEnv === 'browserstack_mobile';

  if (isBrowserStackMobile) {
    process.env.INTEGRATION_WEBVIEW_TESTS = 'true';
  }

  const startServer = !flags.debug && !flags.watch && !flags.listTests;

  const server = startServer
    ? await webpack.startDevServer({
        host: flags.host,
        port: flags.port,
        mobile: isBrowserStackMobile,
        watch: flags.watch,
        patterns: testPaths,
        changed: parseChanged(flags.changed),
        testDirectory: 'integration',
      })
    : { close() {} };

  if (server === null) {
    return { exitCode: 0, results: [] };
  }

  const client = initClient({
    browserstack: isBrowserStack,
    mobile: isBrowserStackMobile,
    listTests: flags.listTests,
  });

  await client.startServer();

  if (flags.retry > 1) {
    console.warn(
      `We only support a single rerun at this stage. --retry=${flags.retry} has been reduced to 1.`,
    );
  }

  const { results, exitCode } = await runTestsWithRetry(flags, testPaths, {
    directory: `integration${isBrowserStackMobile ? '-webview' : ''}`,
    maxWorkers: isBrowserStack || isBrowserStackMobile ? 10 : 1,
  });

  // When flags.listTests is used we haven't actually run the tests, so we don't track and log anything.
  if (!flags.listTests) {
    try {
      const urls = await logBrowserstackBuildSessionUrl(exitCode);
      // We create a folder to store the artifacts generated when we process the test analytics events.
      await generateArtifacts(JSON.stringify(urls, null, 2));
      // Dispatch analytics
      await processAnalyticsForTestResults(
        results,
        'integration_test',
        modifiers,
      );
    } catch (err) {
      // Capture and log the error, but don't block the pipeline.
      console.error(err);
    }
    console.log(`Exiting tests with exit code: ${exitCode}`);
  }

  try {
    await server.close();
  } catch (err) {
    console.error('Encountered errors closing webpack dev server', err);
  }
  client.stopServer();

  return { exitCode: flags.gracefulExit ? 0 : exitCode, results };
}

/** Expose CLI parsing to the test-pipeline runner so that it can parse flag aliases correctly */
export function parseCliArgs(
  argv: string[],
): { input: string[]; flags: Partial<Flags>; help?: string } {
  return meow(USAGE, {
    argv,
    flags: {
      updateSnapshot: {
        type: 'boolean',
        alias: 'u',
      },
      retry: {
        type: 'number',
        alias: 'r',
      },
      listTests: {
        type: 'boolean',
      },
      json: {
        type: 'boolean',
      },
      testDir: {
        type: 'string',
      },
      port: {
        type: 'number',
      },
      host: {
        type: 'string',
      },
      changed: {
        type: 'string',
      },
      testEnv: {
        type: 'string',
      },
      watch: {
        type: 'boolean',
      },
      gracefulExit: {
        type: 'boolean',
      },
    },
  });
}

if (require.main === module) {
  const cli = parseCliArgs(process.argv);

  main(cli.flags, cli.input)
    .then(response => {
      response && process.exit(response.exitCode);
    })
    .catch(err => {
      console.error(err);
      process.exit(1);
    });
}
