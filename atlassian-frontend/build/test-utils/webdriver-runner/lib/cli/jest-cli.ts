import { runCLI } from 'jest';
import path from 'path';
import type { Flags } from '../runner/flags';
import type { RetryOptions } from '../runner/jest-runner';

export async function runJest(
  flags: Flags,
  testPaths: string[],
  retryOptions: RetryOptions,
) {
  const status = await runCLI(
    {
      $0: `webdriver-runner/.../${path.basename(__filename)}`,
      _: testPaths,
      json: flags.json,
      listTests: flags.listTests,
      maxWorkers: retryOptions.maxWorkers,
      watch: !!process.env.WATCH,
      watchPathIgnorePatterns: [
        '\\/node_modules\\/',
        `.+\\/__tests__\\/(?!${retryOptions.directory})`,
        '.+\\/__snapshots__\\/',
        '.+\\/__image_snapshots__\\/',
      ],
      passWithNoTests: true,
      updateSnapshot: flags.updateSnapshot,
      ci: !!process.env.CI,
    },
    [flags.testDir],
  );

  return status.results;
}
