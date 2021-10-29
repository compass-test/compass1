import path from 'path';

import { AggregatedResult } from '@jest/test-result';
import * as bolt from 'bolt';
import meow from 'meow';

import { PackageInfo } from '@atlaskit/build-utils/tools';

import {
  shouldSkipCache,
  createCache,
  getPackageCacheInfo,
  storeCache,
} from '../lib/cache';
import { printTestResults } from '../lib/messages';
import { runJestCli, getTestTypeFlags } from '../lib/test/run-jest-cli';
import {
  TestStatus,
  TestablePackage,
  getTestType,
  PackageCacheInfo,
} from '../lib/types';

export class FailingTestsError extends Error {
  constructor(message: string, public code: number) {
    super(message);
  }
}

export type Flags = {
  /** cwd: working directories from which to run tests (defaults to process.cwd()) */
  cwd?: string;
  /** Ignore CHANGED_PACKAGES variable and execute over all packages */
  allPackages?: boolean;
  /** testType: leave blank to run unit tests, or specify vr/unit/webdriver */
  testType?: string;
  /** Skip tests for packages that have not changed since last successful test run */
  cached?: boolean;
  /** Arbitrary jest / test runner flags */
  [key: string]: unknown;
};

function parseTestResults(
  results: AggregatedResult,
  testablePackages: TestablePackage[],
) {
  // Use Set for easy deduping
  const failedPackages: Set<PackageInfo> = new Set();

  for (let result of results.testResults) {
    if (
      result.numFailingTests !== 0 ||
      result.failureMessage !== null ||
      result.testExecError
    ) {
      const packageInfo = testablePackages.find(pkg =>
        // Must include trailing slash to ensure we perform a full match against the package dir
        result.testFilePath.includes(`${pkg.relativeDir}${path.sep}`),
      );
      if (packageInfo) {
        failedPackages.add(packageInfo);
      } else {
        throw new Error(
          `Cannot find package belonging to test failure: ${result.testFilePath}`,
        );
      }
    }
  }

  const successfulPackages = testablePackages.filter(
    pkg => !failedPackages.has(pkg),
  );

  return { successfulPackages, failedPackages: [...failedPackages] };
}

type StatusWithResults = Omit<TestStatus, 'results'> &
  Required<Pick<TestStatus, 'results'>>;

function testsHaveResults(status: TestStatus): status is StatusWithResults {
  const { results, exitCode } = status;
  if (
    !results ||
    !results.length ||
    results.every(run => !run.aggregatedResult)
  ) {
    if (exitCode === 0) {
      // Don't cache test executions that don't have a jest result
      console.log('Gracefully exiting with no results');
      return false;
    } else {
      throw new FailingTestsError(
        'Tests failed without results',
        exitCode || 1,
      );
    }
  }

  return true;
}

function getJestFlags(flags: Flags, testTypeFlags?: Record<string, unknown>) {
  const { allPackages, cached, testType, cwd, ...jestFlags } = {
    ...flags,
    ...(testTypeFlags || {}),
  };
  return jestFlags;
}

/**
 * Test pipeline runner
 *
 * Main entry point through which we run tests.
 * Calls through to individual test type runners.
 * When caching is enabled, we fetch from and store to the test execution cache to skip running tests for packages
 * that have not changed in order to minimise the number of packages we run tests over and reduce execution time.
 * Caching is only enabled in CI for specific builds (default + landkid).
 */
export default async function main(
  /** Parsed flags, includes arbitrary flags that are not declared in meow */
  flags: Flags,
  /** Specific test type flags as parsed by the relevant test runner, used to convert flag aliases */
  testTypeFlags?: Record<string, unknown>,
  /** Run tests over a specific pattern */
  testPattern?: string[],
  /** Allow already fetched package cache info to be passed in */
  packageCacheInfo?: PackageCacheInfo,
) {
  // NODE_ENV needs to be set to test for jest to work correctly
  process.env.NODE_ENV = 'test';

  const testType = getTestType(flags.testType);

  const cwd = flags.cwd || process.cwd();
  const rootDir = (await bolt.getProject({ cwd })).dir;

  // Change directory to the root and run all scripts from that directory
  process.chdir(rootDir);

  /* Clear out `execArgv` to ensure that ts-node isn't registered in subprocesses spawned by jest as
   * they are registered using the root tsconfig.json rather than test-pipeline's tsconfig.json because
   * of process.chdir above.
   * The root tsconfig.json has a `module` field of `esnext` which breaks our scripts
   * that are run in a cjs environment. One example is our babel plugins that are transpiled
   * and executed as part of babel-jest. */
  process.execArgv = [];

  const useCache = !shouldSkipCache(flags);
  const jestFlags = getJestFlags(flags, testTypeFlags);
  if (useCache) {
    const cache = await createCache(cwd, flags);
    const { testablePackages, skippedPackages, packagesWithTests } =
      packageCacheInfo ||
      (await getPackageCacheInfo(cache, cwd, flags, testPattern));
    // Our jest config uses CHANGED_PACKAGES to determine which tests to run
    process.env.CHANGED_PACKAGES = JSON.stringify(
      testablePackages.map(pkg => pkg.relativeDir),
    );
    if (!testablePackages.length) {
      printTestResults(
        cache,
        testablePackages,
        packagesWithTests,
        [],
        skippedPackages,
      );
      return;
    }

    cache.logger.info(
      `Running ${testType || 'unit'} tests for ${
        testablePackages.length
      } packages: ${testablePackages.map(pkg => pkg.name)}`,
    );
    const status = await runJestCli(rootDir, jestFlags, testType, testPattern);

    // TODO: loop through status.results and cache each result set
    // Perhaps we should filter out empty results before proceeding
    // https://product-fabric.atlassian.net/browse/AFP-3191
    if (!testsHaveResults(status)) {
      return;
    }
    const { successfulPackages, failedPackages } = parseTestResults(
      status.results[0].aggregatedResult,
      testablePackages,
    );

    if (!flags.listTests) {
      // Only store cache when running tests rather than listing them
      await storeCache(cache, successfulPackages);
    }

    printTestResults(
      cache,
      testablePackages,
      packagesWithTests,
      failedPackages,
      skippedPackages,
    );

    const { exitCode } = status;
    if (exitCode !== 0) {
      throw new FailingTestsError('', exitCode);
    }
  } else {
    if (process.env.CHANGED_PACKAGES && !testPattern) {
      const changedPackages = JSON.parse(process.env.CHANGED_PACKAGES);
      console.log(
        `Running ${testType || 'unit'} tests for ${
          changedPackages.length
        } packages: ${changedPackages}`,
      );
    }
    const status = await runJestCli(rootDir, jestFlags, testType, testPattern);
    if (!testsHaveResults(status)) {
      return;
    }

    const { exitCode } = status;
    if (exitCode !== 0) {
      throw new FailingTestsError('', exitCode);
    }
  }
}

if (require.main === module) {
  const cli = meow(
    `
      Usage
        $ test [packageA [packageB ...]]

      Options
        -t                                Test type (unit, webdriver or vr)
        --cached                          Skip tests for packages that have not changed
        --allPackages                     Ignore existing CHANGED_PACKAGES env variable and run over all packages

      Examples
        $ test --cached
        $ test @atlaskit/button
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
        allPackages: {
          type: 'boolean',
        },
      },
    },
  );

  const testTypeFlags = getTestTypeFlags(cli.flags.testType, process.argv);
  main(cli.flags, testTypeFlags, cli.input).catch(e => {
    if (e instanceof FailingTestsError) {
      console.error(e.message);
      process.exit(e.code || 1);
    }

    console.error(e);
    process.exit(1);
  });
}
