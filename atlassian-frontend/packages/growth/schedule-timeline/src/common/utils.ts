import moment, { Moment } from 'moment-timezone';
import { IntervalUnit, Period, DateTime } from './types';

// The calendar must render a full day starting from midnight in the specified timezone
export const localMidnight = (date: DateTime, timezone: string): Moment =>
  moment.tz(date, timezone).set({
    hour: 0,
    minute: 0,
    second: 0,
    millisecond: 0,
  });

export const calculateDays = (
  startDate: DateTime,
  timezone: string,
  interval: number = 2,
  intervalUnit: IntervalUnit = 'weeks',
): number => {
  const localStartDate = localMidnight(startDate, timezone);

  const localEndDate = moment(localStartDate).add(interval, intervalUnit);
  // Rounding because DST changes that occur within the given period result in a fractional day calculation
  return Math.round(
    moment.duration(localEndDate.diff(localStartDate)).asDays(),
  );
};

export const filterSchedules = (
  schedules: Period[],
  startDate: DateTime,
  timezone: string,
  days: number,
): Period[] => {
  const localStartDate = localMidnight(startDate, timezone);

  const startDateMillis = moment(localStartDate).valueOf();
  const endDateMillis = moment(localStartDate).add(days, 'days').valueOf();
  return schedules.filter(
    ({
      startDate: scheduleStartDate,
      endDate: scheduleEndDate,
    }: Period): boolean =>
      moment(scheduleStartDate).valueOf() < endDateMillis &&
      moment(scheduleEndDate).valueOf() > startDateMillis,
  );
};

/**
 * Normalises a local time by changing the UTC offset from the local offset to UTC
 * without converting the time of day.
 *
 * e.g. Given a local time equivalent to:
 *      2019-10-06T00:00:00.000+10:00 (Australia/Sydney), this returns
 *      2019-10-06T00:00:00.000Z (UTC)
 * Similarly, following the DST changover, given a local time equivalent to:
 *      2019-10-07T00:00:00.000+11:00 (Australia/Sydney), this returns
 *      2019-10-07T00:00:00.000Z (UTC)
 *
 * This is used to ensure that for the purposes of rendering the schedules,
 * each day is treated as exactly 24 hours. This avoids issues with the typical
 * 23 or 25 hour local days that occur during DST changeovers.
 *
 * @param date - ISO-8601 date string or Date object representing the instant in time to normalize
 * @param timezone -
 */
export const normalizeDate = (date: DateTime, timezone: string): Date => {
  const dateStr = moment
    .tz(date, timezone)
    .format('YYYY-MM-DD[T]HH:mm:ss.SSS[Z]');
  return new Date(dateStr);
};

// Initials are extracted using the spread operator below to ensure surrogate pairs don't get split.
// https://stackoverflow.com/questions/4547609/how-do-you-get-a-string-to-a-character-array-in-javascript/34717402#34717402
//
// Note that this does not correctly handle Unicode grapheme clusters.
// A future, improved implementation could make use of a 3rd party library,
// such as grapheme-splitter.
// https://github.com/orling/grapheme-splitter
const getInitial = (namePart: string): string => [...namePart][0].toUpperCase();

// Constants used for determining how to abbreviate a string.
// Values are based on the implementation in Opsgenie
// https://bitbucket.org/opsgenie/opsgenie-web-static/src/master/new-frontend/src/filters/layer-participant.filter.js
const FIRST_INITIAL = 2.8;
const ALL_INITIALS = 8;
const FIRST_NAME_PLUS_INITIALS = 12;
const DEFAULT_WIDTH = 13;
/**
 * Conditionally abbreviate a label for rendering in a Period bar.
 *
 * @param input - The label to be abbreviated
 * @param width - The width, as a percentage, of the bar being rendered
 */
export const adjustLabelToFit = (
  input: string = '',
  width: number = DEFAULT_WIDTH,
): string => {
  const parts = input.trim().split(/\s+/);

  if (width < FIRST_INITIAL) {
    // First initial only
    return getInitial(parts[0]).toUpperCase();
  } else if (width <= ALL_INITIALS) {
    // All Initials
    return parts.map(getInitial).join('');
  } else if (width < FIRST_NAME_PLUS_INITIALS) {
    // First name, plus dotted-initials of all subseqent names
    return [
      parts[0],
      ...parts.slice(1).map((part) => `${getInitial(part)}.`),
    ].join(' ');
  }

  return input;
};

/**
 * Conditionally change a label's tooltip text for rendering in a Period bar.
 *
 * @param input - The label to be checked
 */
export const generateTooltipLabel = (label: string): string => {
  if (label === '--') {
    return 'No-one';
  }
  return label;
};
