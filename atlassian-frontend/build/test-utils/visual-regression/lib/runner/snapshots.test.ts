import type { AggregatedResult, TestResult } from '@jest/test-result';

import * as snapshots from './snapshots';

// Mocking ahead of storing the result in a const
jest
  .spyOn(snapshots, 'moveScreenshotsFromLastRun')
  .mockImplementation(() => {});

const {
  isSnapshotAddedFailure,
  hasAddedSnapshotsInCI,
  moveScreenshotsFromLastRun,
} = snapshots;

describe('moveScreenshotsFromLastRun', () => {
  // This function performs a slow, synchronous glob search
  // If your testing a function that invokes this method, ensure
  // your tests are mocking it.
  it('should be fast when mocked', () => {
    // This test is useless except for proving that the mock functions
    moveScreenshotsFromLastRun();
    // @ts-ignore
    expect(moveScreenshotsFromLastRun.mock.instances.length).toBe(1);
  });
});

describe('isSnapshotAddedFailure', () => {
  it(`should be true when snapshots weren't written`, () => {
    const results = {
      failureMessage: 'New snapshot was not written',
    };
    const didFail = isSnapshotAddedFailure(results);
    expect(didFail).toBe(true);
  });

  it(`should be false when snapshots were written`, () => {
    const didFail1 = isSnapshotAddedFailure({});
    expect(didFail1).toBe(false);

    const didFail2 = isSnapshotAddedFailure({
      failureMessage: 'something else',
    });
    expect(didFail2).toBe(false);
  });
});

describe('hasAddedSnapshotsInCI', () => {
  let isCI: string | undefined;
  const resultsWithSnapshots: Pick<AggregatedResult, 'testResults'> = {
    testResults: [
      ({
        failureMessage: 'New snapshot was not written',
      } as unknown) as TestResult,
    ],
  };
  const resultsWithoutSnapshots: Pick<AggregatedResult, 'testResults'> = {
    testResults: [({} as unknown) as TestResult],
  };

  beforeAll(() => {
    isCI = process.env.CI;
  });
  beforeEach(() => {
    process.env.CI = undefined;
  });
  afterEach(() => {
    if (isCI) {
      process.env.CI = isCI;
    } else {
      delete process.env.CI;
    }
  });

  it('should be true when snapshots were written in CI', () => {
    process.env.CI = 'true';
    expect(hasAddedSnapshotsInCI(resultsWithSnapshots)).toBe(true);
  });

  it(`should be false when snapshots weren't written in CI`, () => {
    process.env.CI = 'true';
    expect(hasAddedSnapshotsInCI(resultsWithoutSnapshots)).toBe(false);
  });

  it('should be false when snapshots were written, but not in CI', () => {
    process.env.CI = '';
    expect(hasAddedSnapshotsInCI(resultsWithSnapshots)).toBe(false);
  });
});
