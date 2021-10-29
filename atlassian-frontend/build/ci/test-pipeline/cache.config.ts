import fs from 'fs';
import path from 'path';

import * as bolt from 'bolt';
import JSON5 from 'json5';

import { CacheConfig } from '@af/cache';
import { S3RemoteStore } from '@af/s3-remote-store';

export const cacheConfig: CacheConfig = {
  logLevel: 'info',
  // Only enable remote caching in CI. This env var is set in build-setup.sh
  remoteStore: process.env.CI === 'true' ? S3RemoteStore : undefined,
  includeDevDependencies: 'direct',
  filterDevDependencies,
  outputGlobs: [],
  excludeGlobs: [
    '**/*.txt',
    '**/(README|CHANGELOG).md',
    '**/LICENSE',
    '**/.npmignore',
  ],
  implicitDependencies: {
    packages: {
      '@af/test-pipeline': '*',
      '@atlaskit/jest-config': '*',
      '@atlaskit/multi-entry-tools': '*',
    },
    files: {
      'tsconfig.json': '*',
      'jest.config.js': '*',
      // We can't pull the babel configs into this package as certain options are resolved relative to their path which must be the root
      'babel.config.js': '*',
      'babel.config.shared.js': '*',
    },
  },
};

const devDependenciesMap = new Map<string, Array<[string, string]>>();

/**
 * Dependencies used only by examples (which are declared in each package's examples/config.jsonc file)
 * don't effect the outcome of tests so can be excluded from the hash
 */
function filterDevDependencies(pkg: bolt.Package) {
  const cachedDevDeps = devDependenciesMap.get(pkg.name);
  if (cachedDevDeps) {
    return cachedDevDeps;
  }

  let devDeps = Object.entries(pkg.config.devDependencies || {});

  const exampleConfigPath = path.join(pkg.dir, 'examples', 'config.jsonc');
  if (fs.existsSync(exampleConfigPath)) {
    const exampleConfigFile = fs.readFileSync(exampleConfigPath, 'utf-8');
    const exampleConfig = JSON5.parse(exampleConfigFile);
    if (
      exampleConfig?.exampleDependencies &&
      Array.isArray(exampleConfig.exampleDependencies)
    ) {
      devDeps = devDeps.filter(
        ([dep]) => !exampleConfig.exampleDependencies.includes(dep),
      );
    }
  }

  devDependenciesMap.set(pkg.name, devDeps);
  return devDeps;
}
