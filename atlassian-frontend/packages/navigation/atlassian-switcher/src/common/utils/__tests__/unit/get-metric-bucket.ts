import { getMetricBucket, RenderTrackerBuckets } from '../../get-metric-bucket';

describe('utils/get-metric-bucket', () => {
  it('should return correct buckets when various durations specified', () => {
    expect(getMetricBucket(0, RenderTrackerBuckets)).toEqual('500');
    expect(getMetricBucket(1, RenderTrackerBuckets)).toEqual('500');
    expect(getMetricBucket(500.5, RenderTrackerBuckets)).toEqual('1000');
    expect(getMetricBucket(600, RenderTrackerBuckets)).toEqual('1000');
    expect(getMetricBucket(1000, RenderTrackerBuckets)).toEqual('1000');
    expect(getMetricBucket(1200, RenderTrackerBuckets)).toEqual('2000');
    expect(getMetricBucket(2400, RenderTrackerBuckets)).toEqual('4000');
    expect(getMetricBucket(5000, RenderTrackerBuckets)).toEqual('+Inf');
    // Currently,getMetricBucketnegative values return null.
    expect(getMetricBucket(-100, RenderTrackerBuckets)).toEqual(null);
  });
});
