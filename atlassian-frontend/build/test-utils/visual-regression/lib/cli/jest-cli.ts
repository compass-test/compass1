import { runCLI } from 'jest';
import path from 'path';
import type { Flags } from '../runner/flags';
import type { RetryOptions } from '../runner/jest-runner';

export async function runJest(
  flags: Flags,
  testPaths: string[],
  retryOptions: RetryOptions,
) {
  // We disallow snapshot updating on debug mode (which uses a headless instance of chrome
  // on a local system) to avoid system level inconsistencies between a local devs machine
  // and the docker image run in CI.
  const updateSnapshot = !flags.debug && !!flags.updateSnapshot;
  const status = await runCLI(
    {
      $0: `visual-regression/.../${path.basename(__filename)}`,
      _: testPaths,
      json: flags.json,
      listTests: flags.listTests,
      passWithNoTests: true,
      updateSnapshot,
      debug: flags.debug,
      watch: flags.watch,
      watchPathIgnorePatterns: [
        '\\/node_modules\\/',
        `.+\\/__tests__\\/(?!${retryOptions.directory})`,
        '.+\\/__snapshots__\\/',
        '.+\\/__image_snapshots__\\/',
      ],
      ci: !!process.env.CI,
    },
    [flags.testDir],
  );

  return status.results;
}
