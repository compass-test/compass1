import { G300, N70, R300 } from '@atlaskit/theme/colors';

import { NOT_APPLICABLE } from '../../../constants';
import { ArrowDownIcon, ArrowUpIcon, EqualIcon } from '../../../ui';
import {
  calculateAbsoluteDiff,
  calculatePercentageDiff,
  getDiffColor,
  getDiffData,
  getLocalisedAbsoluteDiff,
  getLocalisedPercentageDiff,
} from '../../diff';

describe('calculateAbsoluteDiff', () => {
  it('should return absolute diff for numbers', () => {
    expect(calculateAbsoluteDiff(100, 50)).toEqual(50);
    expect(calculateAbsoluteDiff(100, 100)).toEqual(0);
    expect(calculateAbsoluteDiff(0, 100)).toEqual(-100);
    expect(calculateAbsoluteDiff(100, 0)).toEqual(100);
    expect(calculateAbsoluteDiff(10, 15)).toEqual(-5);
    expect(calculateAbsoluteDiff(15, 10)).toEqual(5);
    expect(calculateAbsoluteDiff(0, 0)).toEqual(0);
  });

  it('should return null for non-number types', () => {
    expect(calculateAbsoluteDiff(NaN, 50)).toEqual(null);
    expect(calculateAbsoluteDiff(50, NaN)).toEqual(null);
    expect(calculateAbsoluteDiff(Infinity, 50)).toEqual(null);
    expect(calculateAbsoluteDiff(50, Infinity)).toEqual(null);
    expect(calculateAbsoluteDiff(Infinity, Infinity)).toEqual(null);
    expect(calculateAbsoluteDiff(0, Infinity)).toEqual(null);
    expect(calculateAbsoluteDiff(NaN, Infinity)).toEqual(null);
  });
});

describe('calculatePercentageDiff', () => {
  it('should return percentage diff for numbers', () => {
    expect(calculatePercentageDiff(10, 5)).toEqual(100);
    expect(calculatePercentageDiff(10, 15)).toEqual(-33.33);
    expect(calculatePercentageDiff(15, 10)).toEqual(50);
    expect(calculatePercentageDiff(10, 10)).toEqual(0);
    expect(calculatePercentageDiff(0, 0)).toEqual(0);
  });

  it('should return null for non-number types', () => {
    expect(calculatePercentageDiff(NaN, 50)).toEqual(null);
    expect(calculatePercentageDiff(50, NaN)).toEqual(null);
    expect(calculatePercentageDiff(Infinity, 50)).toEqual(null);
    expect(calculatePercentageDiff(50, Infinity)).toEqual(null);
    expect(calculatePercentageDiff(Infinity, Infinity)).toEqual(null);
    expect(calculatePercentageDiff(0, Infinity)).toEqual(null);
    expect(calculatePercentageDiff(NaN, Infinity)).toEqual(null);
  });
});

describe('getDiffColor', () => {
  it('should return the right color', () => {
    expect(getDiffColor(200, 2.14)).toEqual(R300);
    expect(getDiffColor(50, 2.14)).toEqual(R300);
    expect(getDiffColor(110, 0.14)).toEqual(R300);
    expect(getDiffColor(-200, -2.14)).toEqual(G300);
    expect(getDiffColor(-50, -2.14)).toEqual(G300);
    expect(getDiffColor(-110, -0.14)).toEqual(G300);
    expect(getDiffColor(90, 1.14)).toEqual(N70);
    expect(getDiffColor(-90, -1.14)).toEqual(N70);
    expect(getDiffColor(0, 0)).toEqual(N70);
  });
});

describe('getLocalisedAbsoluteDiff', () => {
  it('should return localised absolute diff', () => {
    expect(getLocalisedAbsoluteDiff(1234, 'ms')).toEqual('+1,234 ms');
    expect(getLocalisedAbsoluteDiff(123, 'ms')).toEqual('+123 ms');
    expect(getLocalisedAbsoluteDiff(0, '')).toEqual('0');
    expect(getLocalisedAbsoluteDiff(-22.44, 'ms')).toEqual('-22.44 ms');
    expect(getLocalisedAbsoluteDiff(-2222.44, 'ms')).toEqual('-2,222.44 ms');
  });
});

describe('getLocalisedPercentageDiff', () => {
  it('should return localised percentage diff', () => {
    expect(getLocalisedPercentageDiff(1234)).toEqual('+1,234%');
    expect(getLocalisedPercentageDiff(123)).toEqual('+123%');
    expect(getLocalisedPercentageDiff(0)).toEqual('0%');
    expect(getLocalisedPercentageDiff(-22.44)).toEqual('-22.44%');
    expect(getLocalisedPercentageDiff(-2222.44)).toEqual('-2,222.44%');
  });
});

describe('getDiffData', () => {
  describe('should return the right diff data', () => {
    it('with small numbers', () => {
      expect(getDiffData(18, 12, 'ms')).toEqual({
        absoluteDiff: 6,
        percentageDiff: 50,
        absoluteDiffStr: '+6 ms',
        percentageDiffStr: '+50%',
        color: R300,
        Icon: ArrowUpIcon,
      });
      expect(getDiffData(12, 18, 'ms')).toEqual({
        absoluteDiff: -6,
        percentageDiff: -33.33,
        absoluteDiffStr: '-6 ms',
        percentageDiffStr: '-33.33%',
        color: G300,
        Icon: ArrowDownIcon,
      });
      expect(getDiffData(12, 12, 'ms')).toEqual({
        absoluteDiff: 0,
        percentageDiff: 0,
        absoluteDiffStr: '0 ms',
        percentageDiffStr: '0%',
        color: N70,
        Icon: EqualIcon,
      });
      expect(getDiffData(12, 14, 'ms')).toEqual({
        absoluteDiff: -2,
        percentageDiff: -14.29,
        absoluteDiffStr: '-2 ms',
        percentageDiffStr: '-14.29%',
        color: N70,
        Icon: ArrowDownIcon,
      });
      expect(getDiffData(14, 12, 'ms')).toEqual({
        absoluteDiff: 2,
        percentageDiff: 16.67,
        absoluteDiffStr: '+2 ms',
        percentageDiffStr: '+16.67%',
        color: N70,
        Icon: ArrowUpIcon,
      });
    });

    it('with large numbers', () => {
      expect(getDiffData(140, 120, 'ms')).toEqual({
        absoluteDiff: 20,
        percentageDiff: 16.67,
        absoluteDiffStr: '+20 ms',
        percentageDiffStr: '+16.67%',
        color: R300,
        Icon: ArrowUpIcon,
      });
      expect(getDiffData(120, 140, 'ms')).toEqual({
        absoluteDiff: -20,
        percentageDiff: -14.29,
        absoluteDiffStr: '-20 ms',
        percentageDiffStr: '-14.29%',
        color: G300,
        Icon: ArrowDownIcon,
      });
      expect(getDiffData(120, 120, 'ms')).toEqual({
        absoluteDiff: 0,
        percentageDiff: 0,
        absoluteDiffStr: '0 ms',
        percentageDiffStr: '0%',
        color: N70,
        Icon: EqualIcon,
      });
      expect(getDiffData(120, 122, 'ms')).toEqual({
        absoluteDiff: -2,
        percentageDiff: -1.64,
        absoluteDiffStr: '-2 ms',
        percentageDiffStr: '-1.64%',
        color: N70,
        Icon: ArrowDownIcon,
      });
      expect(getDiffData(122, 120, 'ms')).toEqual({
        absoluteDiff: 2,
        percentageDiff: 1.67,
        absoluteDiffStr: '+2 ms',
        percentageDiffStr: '+1.67%',
        color: N70,
        Icon: ArrowUpIcon,
      });
    });

    it('with one or more parameters undefined', () => {
      expect(getDiffData(undefined, 120, 'ms')).toEqual({
        absoluteDiff: null,
        percentageDiff: null,
        absoluteDiffStr: NOT_APPLICABLE,
        percentageDiffStr: NOT_APPLICABLE,
        color: N70,
        Icon: EqualIcon,
      });
      expect(getDiffData(120, undefined, 'ms')).toEqual({
        absoluteDiff: null,
        percentageDiff: null,
        absoluteDiffStr: NOT_APPLICABLE,
        percentageDiffStr: NOT_APPLICABLE,
        color: N70,
        Icon: EqualIcon,
      });
      expect(getDiffData(undefined, undefined, 'ms')).toEqual({
        absoluteDiff: null,
        percentageDiff: null,
        absoluteDiffStr: NOT_APPLICABLE,
        percentageDiffStr: NOT_APPLICABLE,
        color: N70,
        Icon: EqualIcon,
      });
    });
  });
});
