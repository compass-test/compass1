import format from 'date-fns/format';
import {
  LabelFormatter,
  TickFormatterFunction,
  TooltipFormatter,
} from 'recharts';

/**
 * Format a date in UTC
 * @param value Input date. If passed a string, create a date with the string as argument to constructor.
 * @param pattern Unicode Technical Standard #35 tokens
 * (see https://blog.date-fns.org/post/unicode-tokens-in-date-fns-v2-sreatyki91jg/ and
 * https://unicode.org/reports/tr35/tr35-dates.html)
 */
export const formatInUTC = (value: Date | string, pattern: string) => {
  let dateValue: Date;
  if (value instanceof Date) {
    dateValue = value;
  } else {
    dateValue = new Date(value);
  }
  const utcDate = new Date(
    dateValue.getUTCFullYear(),
    dateValue.getUTCMonth(),
    dateValue.getUTCDate(),
    dateValue.getUTCHours(),
    dateValue.getUTCMinutes(),
    dateValue.getUTCSeconds(),
    dateValue.getUTCMilliseconds(),
  );
  return format(utcDate, pattern);
};

export const dateTickFormatter: TickFormatterFunction = (value: string) => {
  const date = new Date(value);
  return formatInUTC(date, 'd MMM');
};

export const formatNumber = (number: number | string) => {
  if (typeof number === 'string') {
    number = parseInt(number);
  }
  return Math.round(number).toLocaleString();
};

export const tooltipNumberFormatter = (
  name?: ((name: string) => string) | string,
): TooltipFormatter => (value, _name) => {
  // format return value
  const tooltipValue = Array.isArray(value)
    ? value.map((item) => formatNumber(item)).join(' ~ ')
    : formatNumber(value);

  // replace default name if provided
  const tooltipName = typeof name === 'function' ? name(_name) : name || _name;

  return [tooltipValue, tooltipName];
};

export const tooltipDateLabelFormatter: LabelFormatter = (value) => {
  const date = new Date(value);
  return formatInUTC(date, 'iii, do MMM');
};

export const toISODateString = (date: Date) => {
  return date.toISOString().substring(0, 10);
};
