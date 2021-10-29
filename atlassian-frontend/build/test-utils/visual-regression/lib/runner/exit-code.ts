import { AggregatedResult } from '@jest/test-result';

export function getExitCode(result?: Pick<AggregatedResult, 'success'>) {
  return !result || result.success ? 0 : 1;
}
