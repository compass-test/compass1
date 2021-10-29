import meow from 'meow';

// We can't do @atlaskit/webdriver-runner/utils/webpack due to "paths" option not working well + we want to remove
// WD dependency from VR ASAP
// eslint-disable-next-line @atlassian/tangerine/import/no-relative-package-imports
import * as webpack from '../webdriver-runner/lib/bundle/desktop-webpack-config';
import { processAnalyticsForTestResults } from '@atlaskit/build-reporting';

import { getDefaultFlags } from './lib/runner/flags';
import { runTests } from './lib/runner/jest-runner';
import modifiers from './lib/reporting/modifiers';
import type { TestSuiteResponse } from './lib/runner/jest-runner';
import type { Flags } from './lib/runner/flags';

const USAGE = `
  Usage
    $ yarn test:vr <[paths]> | <[pkgs]>

  Options
    --testDir
    --help                   Prints usage commands & example
    --debug, -d              Runs tests in non-headless Chromium
    --watch, -w              Run VR tests in watch mode (you must start the webpack server in another terminal with this command: VISUAL_REGRESSION=true yarn start <pkg>)
    --retry=<n>, -r          Retry failed VR tests <n> times (maximum of 1 retry to discourage flakiness)
    --repeat=<n>, -e         Repeat VR tests <n> times, forces --retry to 0 (does not include initial run so repeat=1 will run a test twice)
    --updateSnapshot, -u     Update image snapshots
    --listTests              List all VR tests
    --json                   Prints the test results in JSON
    --gracefulExit           Ignores test failures and exists with code 0 gracefully

  Examples
    $ yarn test:vr editor-core --updateSnapshot
    $ yarn test:vr packages/editor/renderer/src/__tests__/visual-regression/layouts.ts --debug
    $ yarn test:vr editor-common packages/editor/editor-core/src/__tests__/visual-regression/common/layouts.ts
    $ yarn test:vr --listTests --json
  `;

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

export default async function main(
  userFlags: Partial<Flags>,
  testPaths: string[],
  _help?: string,
): Promise<TestSuiteResponse> {
  const defaultFlags = getDefaultFlags();
  const flags: Flags = { ...defaultFlags, ...userFlags };

  if (flags.help) {
    console.log(USAGE);
    return { exitCode: 0, results: [] };
  }

  process.env.NODE_ENV = 'test';
  process.env.VISUAL_REGRESSION = 'true';

  if (flags.debug) {
    process.env.VR_DEBUG = 'true';
  }

  const startServer = !flags.debug && !flags.watch && !flags.listTests;
  const server = startServer
    ? await webpack.startDevServer({
        host: flags.host,
        port: flags.port,
        mobile: false,
        watch: flags.watch || false,
        patterns: testPaths,
        changed: parseChanged(flags.changed),
        testDirectory: 'visual-regression',
      })
    : { close() {} };

  if (server === null) {
    return { exitCode: 0, results: [] };
  }

  const { results, exitCode } = await runTests(flags, testPaths, {
    directory: 'visual-regression',
    maxWorkers: process.env.CI ? '50%' : 1,
  });

  // When flags.listTests is used we haven't actually run the tests, so we don't track and log anything
  if (!flags.listTests) {
    try {
      // Dispatch analytics
      await processAnalyticsForTestResults(results, 'vr_test', modifiers);
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

  return { exitCode: flags.gracefulExit ? 0 : exitCode, results };
}

/** Expose CLI parsing to the test-pipeline runner so that it can parse flag aliases correctly */
export function parseCliArgs(
  argv: string[],
): { input: string[]; flags: Partial<Flags>; help?: string } {
  return meow(USAGE, {
    argv,
    flags: {
      testDir: {
        type: 'string',
      },
      gracefulExit: {
        type: 'boolean',
      },
      return: {
        type: 'boolean',
      },
      debug: {
        type: 'boolean',
        alias: 'd',
      },
      listTests: {
        type: 'boolean',
      },
      json: {
        type: 'boolean',
      },
      updateSnapshot: {
        type: 'boolean',
        alias: 'u',
      },
      watch: {
        type: 'boolean',
        alias: 'w',
      },
      retry: {
        type: 'number',
        alias: 'r',
      },
      repeat: {
        type: 'number',
        alias: 'e',
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
    },
  });
}

if (require.main === module) {
  const cli = parseCliArgs(process.argv);

  main(cli.flags, cli.input, cli.help)
    .then(response => {
      response && process.exit(response.exitCode);
    })
    .catch(err => {
      console.error(err);
      process.exit(1);
    });
}
