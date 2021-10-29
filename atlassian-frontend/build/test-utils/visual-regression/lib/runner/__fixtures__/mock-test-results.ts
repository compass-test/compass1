import { constructTestResults } from '@atlaskit/build-reporting';
import * as cli from '../../cli/jest-cli';
import type { AggregatedResult } from '@jest/test-result';

/**
 * Mock Jest test results to avoid running a sub-process of
 * Jest whilst running this test (which would be slow).
 */
export function mockTestResults(
  results?: Partial<AggregatedResult>[] | Partial<AggregatedResult>,
) {
  if (!Array.isArray(results)) {
    results = [results || constructTestResults()];
  }
  const spy = jest.spyOn(cli, 'runJest');
  spy.mockImplementation(() => {
    // Safety precaution in case an insufficient amount of results are passed through
    throw new Error('mockTestResults: Unmocked jest call.');
  });
  results.forEach(mockedResponse => {
    spy.mockResolvedValueOnce(mockedResponse as AggregatedResult);
  });
  return spy;
}
