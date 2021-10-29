import {
  getMean,
  getVariance,
  getConfidenceIntervalUpperBound,
  getMeanIntervalRatio,
} from '../src/process-results/calculate-confidence-interval';
import round from 'lodash/round';

const sample = [
  9,
  9,
  10,
  10,
  12,
  12,
  13,
  13,
  13,
  13,
  13,
  13,
  15,
  15,
  15,
  15,
  16,
  16,
  16,
  16,
  18,
  18,
  22,
  22,
  23,
  23,
  24,
  24,
  24,
  24,
  25,
  25,
];
const MEAN = 16.75;
const VARIANCE = 26.1875;
const SD = Math.sqrt(VARIANCE);
const SAMPLE_SIZE = sample.length;
const CONF_UPPER_BOUND = 18.5;
const MARGIN_OF_ERROR = 10.45;

describe('getMean', () => {
  it('should calculate the mean of an array of numbers', async () => {
    expect(getMean(sample)).toEqual(MEAN);
  });
});

describe('getVariance', () => {
  it('should calculate the variance based on the mean and samples', async () => {
    expect(getVariance(sample, MEAN)).toEqual(VARIANCE);
  });
});

describe('getConfidenceIntervalUpperBound', () => {
  it('should calculate the upper bound fo the confidence interval range', async () => {
    var result = round(
      getConfidenceIntervalUpperBound(MEAN, SD, SAMPLE_SIZE),
      1,
    );
    expect(result).toEqual(CONF_UPPER_BOUND);
  });
});

describe('getMeanIntervalRatio', () => {
  it('should calculate the margin of error based on the confidence interval', async () => {
    expect(getMeanIntervalRatio(MEAN, CONF_UPPER_BOUND)).toEqual(
      MARGIN_OF_ERROR,
    );
  });
});
