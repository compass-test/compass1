const MINUTE = 60;
const HOUR = 60 * MINUTE;
const DAY = 24 * HOUR;
const WEEK = 7 * DAY;

const timeRangeGroups: [number, string][] = [
  [5 * MINUTE, '1 - 5 min'],
  [10 * MINUTE, '5 - 10 min'],
  [30 * MINUTE, '10 - 30 min'],
  [1 * HOUR, '30 min - 1 h'],
  [2 * HOUR, '1 - 2 h'],
  [5 * HOUR, '2 - 5 h'],
  [12 * HOUR, '5 - 12 h'],
  [1 * DAY, '12 h - 1 d'],
  [2 * DAY, '1 - 2 d'],
  [5 * DAY, '2 - 5 d'],
  [1 * WEEK, '~ 1 w'],
];

const largestEstimatedRangeGroup: [number, string] =
  timeRangeGroups[timeRangeGroups.length - 1];

const getEstimatedTimeRange = (estimateSeconds: number): string => {
  const rangeGroup =
    timeRangeGroups.find(([rangeNumber]) => {
      return estimateSeconds < rangeNumber;
    }) || largestEstimatedRangeGroup;

  return rangeGroup[1];
};

export default getEstimatedTimeRange;
