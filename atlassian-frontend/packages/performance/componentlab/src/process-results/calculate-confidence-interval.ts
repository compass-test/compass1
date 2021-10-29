import { PerfToStats, TestResults, ConfidenceIntervalStats } from '../../types';
import { Logger } from 'winston';
import round from 'lodash/round';
import { MARGIN_OF_ERROR } from '../constants';

const MARGIN_OF_ERROR_PERCENT = MARGIN_OF_ERROR / 100;
const Z_VALUE: number = 1.96;

var statResults: PerfToStats = {
  suite: '',
  runners: {},
};

/**
 *  Function iterates through test results, calculating and storing confidence interval values as it progresses
 * @param results - the trace results
 * @param logger  - logger
 * @returns - A Map where the key is test name and the value is another map of runner to Confidence Interval Stats
 */
export function calculateConfidenceIntervalPerRunner<TValue>(
  runnerI: number,
  results: TestResults,
  logger: Logger,
) {
  const testName = results.name;
  statResults.suite = testName;
  const runnerName = Object.keys(results.runners)[runnerI];

  var instructionSample: number[] = [];

  for (const runnerResult of results.runners[runnerName]) {
    if (runnerResult.instructions == null) {
      continue;
    }
    instructionSample.push(runnerResult.instructions.value);
  }
  var data =
    instructionSample.length > 0
      ? getConfidenceStats(instructionSample)
      : {
          confidenceIntervalUpperBound: null, //just the upper bound
          mean: null,
          samplesize: 0,
          variance: null,
          stddev: null,
          marginOfError: 0,
        };

  const runnerStats: ConfidenceIntervalStats = data;
  updateRunnerEntry(runnerName, runnerStats);

  return data;
}

export function calculateSampleSize(
  confidence: ConfidenceIntervalStats,
  logger: Logger,
) {
  if (confidence.mean && confidence.stddev) {
    const targetMarginOfErrorPercent = MARGIN_OF_ERROR_PERCENT;
    var targetMarginOfError = confidence.mean * targetMarginOfErrorPercent;
    var result = Math.pow(
      (Z_VALUE * confidence.stddev) / targetMarginOfError,
      2,
    );
    if (result > 1000) {
      return 999;
    }
    return Math.ceil(result);
  }
  return 0;
}

export function getMeanIntervalRatio(mean: number, upperbound: number): number {
  return round(((upperbound - mean) / mean) * 100, 2);
}

export function getMean(sample: number[]) {
  var sum: number = 0;
  sample.forEach(function getSum(value) {
    sum += value;
  });
  sum /= sample.length;
  return sum;
}

export function getVariance(sample: number[], mean: number) {
  var sum: number = 0;
  sample.forEach(function getVarSum(value) {
    sum += Math.pow(value - mean, 2);
  });
  sum /= sample.length;
  return sum;
}
export function getConfidenceIntervalUpperBound(
  mean: number,
  sd: number,
  samplesize: number,
) {
  return mean + Z_VALUE * (sd / Math.sqrt(samplesize));
}
function getConfidenceStats(sample: number[]) {
  const mean = getMean(sample);
  const variance = getVariance(sample, mean);
  const sd = Math.sqrt(variance);
  var upperBound = getConfidenceIntervalUpperBound(mean, sd, sample.length);
  var percent = getMeanIntervalRatio(mean, upperBound);
  var len = sample.length;
  var data = {
    confidenceIntervalUpperBound: upperBound, //just the upper bound
    mean: mean,
    samplesize: len,
    variance: variance,
    stddev: sd,
    marginOfError: percent,
  } as ConfidenceIntervalStats;
  return data;
}

function updateRunnerEntry(
  runnerId: string,
  runnerStats: ConfidenceIntervalStats,
) {
  statResults.runners[runnerId] = runnerStats;
  return;
}

export function getPerfStats() {
  return statResults;
}
