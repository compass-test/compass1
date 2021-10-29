import addDays from 'date-fns/addDays';
import endOfMonth from 'date-fns/endOfMonth';
import format from 'date-fns/format';
import parseISO from 'date-fns/parseISO';
import setISODay from 'date-fns/setISODay';
import setISOWeek from 'date-fns/setISOWeek';
import setISOWeekYear from 'date-fns/setISOWeekYear';
import startOfWeek from 'date-fns/startOfWeek';
import subDays from 'date-fns/subDays';
import subWeeks from 'date-fns/subWeeks';

const getTimeOfDayUTC = (
  date: Date,
  hour: number,
  minute: number,
  second: number,
  millisecond: number,
) => {
  return new Date(
    Date.UTC(
      date.getUTCFullYear(),
      date.getUTCMonth(),
      date.getUTCDate(),
      hour,
      minute,
      second,
      millisecond,
    ),
  );
};

export const isWeekend = (date: Date) => {
  const dayOfWeek = date.getUTCDay();
  return dayOfWeek === 0 || dayOfWeek === 6;
};

export const getEndOfDayUTC = (date: Date) => {
  return getTimeOfDayUTC(date, 23, 59, 59, 999);
};

export const getPreviousWeekMonday = (date: Date = new Date()) => {
  const previousWeekThisDay = subWeeks(date, 1);
  const previousWeekMonday = startOfWeek(previousWeekThisDay, {
    weekStartsOn: 1,
  });

  return previousWeekMonday;
};

export const getPreviousWeekFriday = (date: Date = new Date()) => {
  const previousWeekMonday = getPreviousWeekMonday(date);
  const previousWeekFriday = addDays(previousWeekMonday, 4);
  return previousWeekFriday;
};

export const getPreviousWorkingDay = (date: Date) => {
  const prevDay = subDays(date, 1);
  if (isWeekend(prevDay)) {
    const val = (date.getUTCDay() + 9) % 7;
    return subDays(date, val);
  }
  return prevDay;
};

export const toUtcIsoDateString = (date: Date) => {
  return date.toISOString().substring(0, 10);
};

export const toIsoDateString = (date: Date) => {
  return format(date, 'yyyy-MM-dd');
};

export const parseIsoDateString = (string: string) => {
  return parseISO(string);
};

export const parseUtcIsoDateString = (utcIsoDateString: string) => {
  const date = parseIsoDateString(utcIsoDateString);

  return new Date(
    Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()),
  );
};

export const getISOWeekRange = ({
  year,
  weekNo,
}: {
  year: number;
  weekNo: number;
}) => {
  const from = setISODay(
    setISOWeek(setISOWeekYear(new Date(), year), weekNo),
    1,
  );
  const to = setISODay(new Date(from.getTime()), 7);

  return {
    from: toIsoDateString(from),
    to: toIsoDateString(to),
  };
};

export const getMonthRange = ({
  year,
  month,
}: {
  year: number;
  month: number;
}) => {
  const from = new Date(year, month, 1);
  const to = endOfMonth(from);
  return {
    from: toIsoDateString(from),
    to: toIsoDateString(to),
  };
};
