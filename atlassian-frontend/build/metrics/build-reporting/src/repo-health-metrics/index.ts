import { RunFn } from './types';
import { default as build } from './build';
import { default as step } from './step';

export type { Options } from './types';

export const commands: Record<string, RunFn> = {
  build,
  step,
};

export { RepoMetricsStore } from './lib/store';
