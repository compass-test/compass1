const INFINITY = '+Inf';

export const ImageLoadTrackerBuckets = [4000, 2000, 1000, 500, 100, 50];
export const RenderTrackerBuckets = [4000, 2000, 1000, 500];

// Group load times in to buckets for metric cardinality
export const getMetricBucket = (
  metricValue: number,
  buckets: number[],
): string | null => {
  return metricValue >= 0
    ? buckets.reduce((lowestBucket, currentBucket) => {
        return metricValue <= currentBucket
          ? currentBucket.toString()
          : lowestBucket.toString();
      }, INFINITY)
    : null;
};
