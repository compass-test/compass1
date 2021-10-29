import { CacheConfig } from '@af/cache';
import { S3RemoteStore } from '@af/s3-remote-store';

export const cacheConfig: CacheConfig = {
  logLevel: 'info',
  // Only enable remote caching in CI. This env var is set in build-setup.sh
  remoteStore: process.env.CI ? S3RemoteStore : undefined,
  outputGlobs: ['.currentBundleSize/**', '.masterBundleSize/**'],
  excludeGlobs: [
    // Non-src directories directly underneath a package
    // We need the trailing single glob star so we don't exclude files directly underneath the root (e.g. package.json)
    'packages/*/*/!(src)/*',
    'packages/*/*/!(src)/*/**',
    '**/__tests__/**',
    '**/(examples|test).{ts,js,tsx,jsx}',
    '**/*.test.{ts,js,tsx,jsx}',
    '**/(README|CHANGELOG).md',
    '**/LICENSE',
    '**/.npmignore',
  ],
  implicitDependencies: {
    packages: {
      '@af/bundle-size-pipeline': '*',
    },
    files: {
      'tsconfig.json': '*',
    },
  },
};
