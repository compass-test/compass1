import * as bolt from 'bolt';
import meow from 'meow';

import {
  shouldSkipCache,
  createCache,
  getPackageCacheInfo,
  storeCache,
  getChangedPackagesWithTests,
} from '../lib/cache';
import { printTestResults } from '../lib/messages';
import { runParallelTests } from '../lib/parallel';
import { getTestType } from '../lib/types';

import runTest from './run-test';

class FailingTestsError extends Error {
  constructor(message: string, public code: number) {
    super(message);
  }
}

export type Flags = {
  /** cwd: working directories from which to run tests (defaults to process.cwd()) */
  cwd?: string;
  /** testType: leave blank to run unit tests, or specify vr/unit/webdriver */
  testType?: string;
  /** Skip tests for packages that have not changed since last successful test run */
  cached?: boolean;
  /** Arbitrary jest / test runner flags */
  [key: string]: unknown;
};

/**
 * Parallel test pipeline runner
 *
 * Entry point for running tests in parallel via dynamic horizontal scaling.
 * Calculates the number of test files belonging to changed packages and triggers an appropriately
 * sized parallel pipeline to execute the tests over. If the size of change is low enough, will run
 * the tests inline via the default test pipeline runner rather than triggering a new pipeline.
 * Caching is still supported via the --cached flag.
 */
export default async function main(flags: Flags) {
  const testType = getTestType(flags.testType);

  const cwd = flags.cwd || process.cwd();
  const rootDir = (await bolt.getProject({ cwd })).dir;

  // Change directory to the root and run all scripts from that directory
  process.chdir(rootDir);

  const useCache = !shouldSkipCache(flags);
  if (useCache) {
    const cache = await createCache(cwd, flags);
    const packageCacheInfo = await getPackageCacheInfo(cache, cwd, flags);
    const {
      testablePackages,
      skippedPackages,
      packagesWithTests,
    } = packageCacheInfo;

    cache.logger.info(
      `Running ${testType || 'unit'} tests for ${
        testablePackages.length
      } packages: ${testablePackages.map(pkg => pkg.name)}`,
    );

    const { success, runInline } = await runParallelTests(
      testType,
      testablePackages,
    );
    if (!success) {
      throw new FailingTestsError('Test pipeline failed', 1);
    }
    if (runInline) {
      /* If a low number of tests are found, run them inline. Return out of the function early as runTest
       * already does the same post-test work of storing cache and printing results
       */
      return runTest(flags, undefined, undefined, packageCacheInfo);
    }

    if (!flags.listTests) {
      // Only store cache when running tests rather than listing them
      await storeCache(cache, testablePackages);
    }

    printTestResults(
      cache,
      testablePackages,
      packagesWithTests,
      [],
      skippedPackages,
    );
  } else {
    const testablePackages = await getChangedPackagesWithTests(cwd, flags);

    console.log(
      `Running ${testType || 'unit'} tests for ${
        testablePackages.length
      } packages: ${testablePackages.map(pkg => pkg.name)}`,
    );
    const { success } = await runParallelTests(testType, testablePackages);
    if (!success) {
      throw new FailingTestsError('Test pipeline failed', 1);
    }
  }
}

if (require.main === module) {
  const cli = meow(
    `
      Usage
        $ test-parallel

      Options
        -t                                Test type (unit, webdriver or vr)
        --cached                          Skip tests for packages that have not changed

      Examples
        $ test-parallel --cached
  `,
    {
      description: 'Tests packages',
      // Exclude unspecified boolean flags from appearing in cache salt
      booleanDefault: undefined,
      flags: {
        cached: {
          type: 'boolean',
        },
        testType: {
          alias: 't',
          type: 'string',
        },
      },
    },
  );

  main(cli.flags).catch(e => {
    if (e instanceof FailingTestsError) {
      console.error(e.message);
      process.exit(e.code || 1);
    }

    console.error(e);
    process.exit(1);
  });
}
