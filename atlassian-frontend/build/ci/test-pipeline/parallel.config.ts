import { Test } from './lib/types';

export type TestConfig = {
  /** Common prefix of the parallel pipelines defined in bitbucket-pipelines.yml */
  pipelineName: string;
  /** A map of pipeline sizes to min/max threshold required to run that size.
   *  For a size entry to be chosen, the total number of test files across all changed packages
   *  must fall between the min/max pair defined in the value.
   */
  buckets: Record<string, [number, number]>;
};

export const INLINE_BUCKET = 'inline';

/**
 * This defines what sized parallel build should be triggered based on the total number of test files
 * to be executed.
 * The INLINE_BUCKET represents running the tests in the original build rather than triggering a new
 * parallel build to run.
 * The sizing thresholds are roughly determined as follows:
 *  INLINE_BUCKET:  0 -> Max number of test files that run faster than the time to spin up and run a new pipeline (~ 3 mins)
 *  Largest size: Minimum threshold should be below number of test files ran in x% of cases where x% is a non-zero arbitrary number we choose -> Infinity
 *  Sizes in between: Rather arbitrary
 *
 * We can finetune this in the future to ensure optimal test times. If pipeline resources aren't a concern we could even just have
 * inline and 8x and nothing in between.
 */
export const parallelTestConfig: Record<Test, TestConfig | null> = {
  unit: {
    pipelineName: 'unit-test-parallel',
    buckets: {
      [INLINE_BUCKET]: [0, 200],
      '2x': [200, 600],
      '4x': [600, 1200],
      // A full landkid unit test build runs more than 3000 tests
      '8x': [1200, Infinity],
    },
  },
  vr: {
    pipelineName: 'vr-test-parallel',
    buckets: {
      [INLINE_BUCKET]: [0, 4],
      '2x': [4, 65],
      '4x': [65, 155],
      '8x': [155, Infinity],
    },
  },
  webdriver: null,
};
