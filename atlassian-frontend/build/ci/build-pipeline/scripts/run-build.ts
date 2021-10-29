/*
 * Atlassian-frontend build runner
 * See https://developer.atlassian.com/cloud/framework/atlassian-frontend/development/build/04-individual-package-builds/ or
 * run `yarn build --help` for more information.
 */
import os from 'os';

import * as bolt from 'bolt';
import meow from 'meow';
import pLimit from 'p-limit';

import { Cache, Logger } from '@af/cache';
import { RepoMetricsStore } from '@atlaskit/build-reporting';
import { getPackagesInfo, PackageInfo } from '@atlaskit/build-utils/tools';

import { cacheConfig } from '../cache.config';
import buildPackage from '../lib/build';
import { DistType } from '../lib/types';

const limit = pLimit(os.cpus().length);

function getPackageFilterGlob(
  inputArgs: string[],
  packagesInfo: PackageInfo[],
) {
  if (inputArgs.length === 0) {
    return undefined;
  }
  const filteredPackages = packagesInfo
    .filter(
      pkg =>
        inputArgs.includes(pkg.name) ||
        inputArgs.includes(pkg.name.split('/')[1]),
    )
    .map(pkg => pkg.name);

  if (filteredPackages.length === 0) {
    return null;
  }

  // Add trailing comma to support arrays of length one
  return `{${filteredPackages},}`;
}

type Public<T> = { [P in keyof T]: T[P] };

async function createCache(cwd: string, skipCache: boolean) {
  let cache: Public<Cache>;
  if (!skipCache) {
    cache = new Cache(cacheConfig, cwd);
    await cache.init();
  } else {
    cache = {
      logger: new Logger('off'),
      init: async () => {},
      computeHash: async () => 'skip',
      fetch: async () => null,
      put: async () => false,
    };
  }

  return cache;
}

type Flags = {
  cwd?: string;
  distType?: string;
  skipCache?: boolean;
  strict?: boolean;
};

export default async function main(packages: string[], flags: Flags) {
  /* Allow skipping the cache via environment variable for toggling in CI */
  const AF_SKIP_CACHE = process.env.AF_SKIP_CACHE === 'true';
  const cwd = flags.cwd || process.cwd();
  const distType: DistType[] | undefined =
    flags.distType && (flags.distType.split(',') as any);

  const packagesInfo: PackageInfo[] = await getPackagesInfo(
    cwd,
    undefined,
    true,
  );
  const packageInfoMap = new Map(packagesInfo.map(pkg => [pkg.dir, pkg]));

  const packageFilterGlob = getPackageFilterGlob(packages, packagesInfo);
  if (packageFilterGlob === null) {
    throw new Error(`Found no packages found for: "${packages}"`);
  }

  const runTopologically = !distType || distType.includes('types');
  // Ignore TS errors when building specific packages to allow individual package builds to work
  const ignoreTsErrors = !flags.strict && packageFilterGlob != null;
  // Skip cache when flag is passed or if we're ignoring TS errors since that will pollute the cache with potentially invalid contents
  const skipCache: boolean = AF_SKIP_CACHE || flags.skipCache || ignoreTsErrors;

  const cache = await createCache(cwd, skipCache);
  const cachedPackages = [],
    builtPackages = [];
  await bolt.runWorkspaceTasks(
    async ({ dir, config }) => {
      const packageInfo = packageInfoMap.get(dir);
      if (!packageInfo) {
        throw new Error(`Cannot find package info for ${dir}`);
      }
      if (!packageInfo.runBuild) {
        return;
      }
      const packageName = config.name;

      return limit(async () => {
        const packageHash = await cache.computeHash(
          packageName,
          Object.entries(flags).map(entry => entry.toString()),
        );

        const metadata = await cache.fetch(packageName, packageHash);
        if (!metadata) {
          const profiler = cache.logger.profile(
            'Build time',
            packageName,
            'info',
          );
          await buildPackage({
            cwd: dir,
            distType,
            ignoreTsErrors,
          });
          profiler.stop();
          builtPackages.push(packageName);
          await cache.put(packageName, packageHash);
        } else {
          cachedPackages.push(packageName);
        }
      });
    },
    {
      cwd,
      filterOpts: {
        only: packageFilterGlob,
      },
      spawnOpts: {
        excludeFromGraph: ['devDependencies'],
        orderMode: runTopologically ? undefined : 'parallel',
        bail: false,
      },
    },
  );

  const repoMetricsStore = new RepoMetricsStore();
  repoMetricsStore.set({
    buildCacheHits: cachedPackages.length,
    buildCacheMisses: builtPackages.length,
  });

  const totalPackages = builtPackages.length + cachedPackages.length;
  cache.logger.info(
    `Built ${builtPackages.length}/${totalPackages} packages, ${cachedPackages.length}/${totalPackages} packages retrieved from cache`,
  );
}

if (require.main === module) {
  process.on('SIGINT', () => {
    // We need our own SIGINT handler since concurrently overrides the default one (and doesn't even throw)
    process.exit(2);
  });
  const cli = meow(
    `
      Usage
        $ build [packageA [packageB ...]]

      Options
        -d, --distType <cjs|esm|es2019|types|none>  Run the build only for specific distTypes, cjs, esm, es2019, or types, or specify 'none' to not compile a dist type and only run other build steps
        -s, --strict                                Do not ignore typescript errors when building single packages. (They are always unignored for full builds)
        --skip-cache                                Skip the cache and run a full rebuild

      Examples
        $ build
        $ build --distType cjs
        $ build @atlaskit/button @atlaskit/spinner -d cjs,esm,es2019 --skip-cache
  `,
    {
      description: 'Builds packages',
      flags: {
        distType: {
          alias: 'd',
          type: 'string',
        },
        skipCache: {
          type: 'boolean',
        },
        strict: {
          alias: 's',
          type: 'boolean',
        },
      },
    },
  );
  main(cli.input, cli.flags).catch(e => {
    console.error(e);
    process.exit(1);
  });
}
