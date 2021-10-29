const ZTest = require('../scripts/calculate-iti.js');
import round from 'lodash/round';

const changesData = {
  stddev: 5.117,
  mean: 16.75,
  samplesize: 31,
};

const baselineData = {
  stddev: 6.65,
  mean: 24.5,
  samplesize: 40,
};

const Z_SCORE = 5.549609;

describe('ZTest', () => {
  it('should return the z score of the given sample mean, stddev, and sample size', async () => {
    expect(round(ZTest(baselineData, changesData), 6)).toEqual(Z_SCORE);
  });
});
