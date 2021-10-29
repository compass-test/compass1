import getEstimatedTimeRange from './index';

const SECOND = 1;
const MINUTE = 60;
const HOUR = 60 * MINUTE;
const DAY = 24 * HOUR;
const WEEK = 7 * DAY;

describe('getEstimatedTimeRange()', () => {
  describe.each<[number, string]>([
    [40, '1 - 5 min'],
    [1 * MINUTE, '1 - 5 min'],
    [2 * MINUTE, '1 - 5 min'],
    [10 * MINUTE - 1 * SECOND, '5 - 10 min'],
    [10 * MINUTE, '10 - 30 min'],
    [1 * HOUR - 1 * MINUTE, '30 min - 1 h'],
    [1 * HOUR, '1 - 2 h'],
    [4 * HOUR, '2 - 5 h'],
    [5 * HOUR - 1 * SECOND, '2 - 5 h'],
    [23 * HOUR, '12 h - 1 d'],
    [1 * DAY - 1 * SECOND, '12 h - 1 d'],
    [1 * DAY + 1 * HOUR, '1 - 2 d'],
    [2 * DAY - 1 * SECOND, '1 - 2 d'],
    [2 * DAY + 1 * HOUR, '2 - 5 d'],
    [7 * DAY - 1 * SECOND, '~ 1 w'],
    [90 * WEEK, '~ 1 w'],
  ])('getEstimatedTimeRange(%i)', (durationInSeconds, expected) => {
    it(`should returns "${expected}" for ${durationInSeconds * 1000}`, () => {
      expect(getEstimatedTimeRange(durationInSeconds)).toEqual(expected);
    });
  });
});
