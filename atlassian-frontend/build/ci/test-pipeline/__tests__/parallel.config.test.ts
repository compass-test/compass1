import { parallelTestConfig } from '../parallel.config';

// Even though they _should_ always be in order, we just want to make sure that the list of bucket
// sizes is sorted with inline coming first and the rest sorted "alphabetically" (by codepoint)
function sortBucketSizes(bucketObj: Record<string, [number, number]>) {
  return Object.keys(bucketObj!).sort((a, b) => {
    if (a === 'inline') {
      return -1;
    }
    if (b === 'inline') {
      return 1;
    }
    return Number(a) - Number(b); // sort "alphabetically"
  });
}

describe('Parallel Config', () => {
  it('should have valid unit-test-parallel config', async () => {
    const unitTestBuckets = parallelTestConfig.unit?.buckets;
    const sizes = sortBucketSizes(unitTestBuckets!);

    for (let i = 0; i < sizes.length - 1; i++) {
      // check that each ending range matches up with the next starting range of the next bucket
      const smallerBucketMaxSize = unitTestBuckets?.[sizes[i]][1];
      const largerBucketMinSize = unitTestBuckets?.[sizes[i + 1]][0];
      expect(smallerBucketMaxSize).toEqual(largerBucketMinSize);
    }
  });

  it('should have valid vr-test-parallel config', async () => {
    const vrTestBuckets = parallelTestConfig.vr?.buckets;
    const sizes = sortBucketSizes(vrTestBuckets!);

    // check all but the last (which has no next bucket)
    for (let i = 0; i < sizes.length - 1; i++) {
      // check that each ending range matches up with the next starting range of the next bucket
      const smallerBucketMaxSize = vrTestBuckets?.[sizes[i]][1];
      const largerBucketMinSize = vrTestBuckets?.[sizes[i + 1]][0];
      expect(smallerBucketMaxSize).toEqual(largerBucketMinSize);
    }
  });
});
