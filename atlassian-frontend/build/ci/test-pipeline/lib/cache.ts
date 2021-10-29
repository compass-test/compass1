/**
 * Cache related functions
 */

import os from 'os';
import path from 'path';

import pLimit from 'p-limit';

import { Cache } from '@af/cache';
import { RepoMetricsStore } from '@atlaskit/build-reporting';
import { getPackagesInfo, PackageInfo } from '@atlaskit/build-utils/tools';

import { cacheConfig } from '../cache.config';

import {
  Public,
  TestablePackage,
  SkippedPackage,
  Test,
  PackageCacheInfo,
  getTestType,
} from './types';

const limit = pLimit(os.cpus().length);

// We use a versioned feature flag to progressively roll out changes/fixes
// Increment this any time we make a fix or change that requires a roll out from a disabled state
export const TEST_CACHE_VERSION = 1;

export const cacheLogFilename = 'cache.log';

export function shouldSkipCache(flags: { cached?: boolean }) {
  return !!(
    !flags.cached ||
    /* Test cache feature flag - local version must match repo variable */
    Number(process.env.AF_TEST_CACHE_VERSION) !== TEST_CACHE_VERSION ||
    /* We don't want to cache when running in parallel. Tests will already be reduced to uncached packages
     * through a previous invocation of the test command with --listTests. */
    process.env.PARALLELIZE_TESTS ||
    process.env.PARALLELIZE_TESTS_FILE
  );
}

export async function createCache(cwd: string, flags: Record<string, unknown>) {
  const config = { ...cacheConfig };
  if (flags.listTests) {
    /* Log to a file when listing tests so they can be parsed */
    config.logFilePath = path.join(cwd, cacheLogFilename);
  }
  const cache: Public<Cache> = new Cache(config, cwd);
  await cache.init();

  return cache;
}

function getRuntimeCacheInputs(flags: Record<string, unknown>) {
  /* These flags should not factor into cache hashes:
   * listTests & json: used when listing tests, should hit cache for test runs without those flags
   *                   cache is never stored for these flags
   * maxWorkers:       does not affect the output of tests at all and should not need to be included everywhere we run tests
   */
  const excludedFlags = ['listTests', 'json', 'maxWorkers'];
  const inputFlags = Object.entries(flags)
    .filter(([key]) => {
      return !excludedFlags.includes(key);
    })
    .map(entry => entry.toString());

  const testType = getTestType(flags.testType as string);
  const envVars = [
    // Controls test environment - browserstack, browserstack_mobile, local
    process.env.TEST_ENV,
    // Browserstack product - app-automate, automate
    process.env.BS_PRODUCT,
    // Webdriver browser targets change between landkid and branch builds
    testType === 'webdriver' ? process.env.LANDKID : false,
  ].filter(Boolean) as string[];

  return [...inputFlags, ...envVars];
}

async function getUncachedPackages(
  cache: Public<Cache>,
  packages: PackageInfo[],
  flags: Record<string, unknown>,
) {
  const testSalt = getRuntimeCacheInputs(flags);
  let testablePackages: TestablePackage[] = [];
  let skippedPackages: SkippedPackage[] = [];

  const profiler = cache.logger.profile('Cache fetch time', undefined, 'info');
  await Promise.all(
    packages.map(async pkg =>
      limit(async () => {
        const packageHash = await cache.computeHash(pkg.name, testSalt);
        const metadata = await cache.fetch(pkg.name, packageHash);

        if (!metadata) {
          testablePackages.push({ ...pkg, hash: packageHash });
        } else {
          skippedPackages.push({
            ...pkg,
            metadata,
          });
        }
      }),
    ),
  );
  profiler.stop();

  return { testablePackages, skippedPackages };
}

function filterPackagesByTestPattern(
  packages: PackageInfo[],
  testPattern: string[] = [],
) {
  if (testPattern.length === 0) {
    return packages;
  }

  return packages.filter(pkg =>
    testPattern.some(pattern => pkg.relativeDir.includes(pattern)),
  );
}

export function getChangedPackagesInfo(
  packagesInfo: PackageInfo[],
  CHANGED_PACKAGES: string,
): PackageInfo[] {
  const packagesInfoMap = new Map(
    packagesInfo.map(pkg => [pkg.relativeDir, pkg]),
  );

  const changedPackages: string[] = JSON.parse(CHANGED_PACKAGES);
  return changedPackages.map(dir => {
    const packageInfo = packagesInfoMap.get(dir);
    if (!packageInfo) {
      throw new Error(`Cannot find package info for ${dir}`);
    }
    return packageInfo;
  });
}

export function getTestPackageInfo(pkg: PackageInfo, testType: Test) {
  if (testType === 'vr') {
    return pkg.tests.vr;
  } else if (testType === 'webdriver') {
    return {
      run: pkg.tests.webdriver.run || pkg.tests.webdriverWebView.run,
      files: [
        ...pkg.tests.webdriver.files,
        ...pkg.tests.webdriverWebView.files,
      ],
    };
  }
  return pkg.tests.unit;
}

export async function getChangedPackagesWithTests(
  cwd: string,
  flags: { testType?: string; allPackages?: boolean },
  testPattern?: string[],
) {
  const packagesInfo: PackageInfo[] = await getPackagesInfo(cwd, undefined);
  const changedPackagesInfo =
    process.env.CHANGED_PACKAGES && !flags.allPackages
      ? getChangedPackagesInfo(packagesInfo, process.env.CHANGED_PACKAGES)
      : filterPackagesByTestPattern(packagesInfo, testPattern);

  const packagesWithTests = changedPackagesInfo.filter(
    pkg => getTestPackageInfo(pkg, flags.testType as Test).run,
  );

  return packagesWithTests;
}

export async function getPackageCacheInfo(
  cache: Public<Cache>,
  cwd: string,
  flags: { testType?: string; allPackages?: boolean },
  testPattern?: string[],
): Promise<PackageCacheInfo> {
  const packagesWithTests = await getChangedPackagesWithTests(
    cwd,
    flags,
    testPattern,
  );

  const { testablePackages, skippedPackages } = await getUncachedPackages(
    cache,
    packagesWithTests,
    flags,
  );

  const repoMetricsStore = new RepoMetricsStore();
  repoMetricsStore.set({
    testCacheHits: skippedPackages.length,
    testCacheMisses: testablePackages.length,
  });

  return { testablePackages, skippedPackages, packagesWithTests };
}

export async function storeCache(
  cache: Public<Cache>,
  packages: TestablePackage[],
) {
  if (packages.length === 0) {
    cache.logger.info('No packages to store');
    return;
  }
  const testMetadata = {
    commit: process.env.BITBUCKET_COMMIT || '',
    pipeline: process.env.BITBUCKET_PIPELINE_UUID || '',
    branch: process.env.BITBUCKET_BRANCH || '',
  };

  cache.logger.info(`Storing cache for: ${packages.map(pkg => pkg.name)}`);
  const profiler = cache.logger.profile('Cache put time', undefined, 'info');
  await Promise.all(
    packages.map(async pkg =>
      limit(async () => {
        await cache.put(pkg.name, pkg.hash, testMetadata);
      }),
    ),
  );
  profiler.stop();
}
