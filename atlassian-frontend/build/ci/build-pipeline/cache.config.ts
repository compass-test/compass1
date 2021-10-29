import { CacheConfig } from '@af/cache';
import { S3RemoteStore } from '@af/s3-remote-store';

export const cacheConfig: CacheConfig = {
  logLevel: 'info',
  // Only enable remote caching in CI. This env var is set in build-setup.sh
  remoteStore: process.env.CI ? S3RemoteStore : undefined,
  outputGlobs: ['dist/**', '*/package.json'],
  excludeGlobs: [
    // known non-src directories directly underneath a package
    'packages/*/*/(docs|examples|codemods)/**/*',
    '**/__tests__/**',
    '**/(examples|test).{ts,js,tsx,jsx}',
    '**/*.test.{ts,js,tsx,jsx}',
    '**/(README|CHANGELOG).md',
    '**/LICENSE',
    '**/.npmignore',
  ],
  implicitDependencies: {
    packages: {
      '@af/build-pipeline': '*',
      '@atlaskit/multi-entry-tools': '*',
    },
    files: {
      'tsconfig.json': '*',
      // We can't pull the babel configs into this package as certain options are resolved relative to their path which must be the root
      'babel.config.js': '*',
      'babel.config.shared.js': '*',
    },
  },
};
