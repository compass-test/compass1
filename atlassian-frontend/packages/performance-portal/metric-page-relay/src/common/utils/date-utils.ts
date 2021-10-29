import addHours from 'date-fns/addHours';

export const getTimeOfDayUTC = (
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

export const getEndOfDayUTC = (date: Date) => {
  return getTimeOfDayUTC(date, 23, 59, 59, 999);
};

export const getStartOfDayUTC = (date: Date) => {
  return getTimeOfDayUTC(date, 0, 0, 0, 0);
};

export const isWeekendDate = (d: Date) => {
  const dayOfWeek = d.getUTCDay();
  return dayOfWeek === 0 || dayOfWeek === 6;
};

export const getPreviousDate = (date: Date) => {
  return addHours(date, -24);
};

export const getPreviousDateNonWeekend = (date: Date) => {
  let prevDate = getPreviousDate(date);
  while (isWeekendDate(prevDate)) {
    prevDate = getPreviousDate(prevDate);
  }
  return prevDate;
};

export const isUTCToday = (date: Date) => {
  const now = new Date();
  return (
    now.getUTCFullYear() === date?.getUTCFullYear() &&
    now.getUTCMonth() === date?.getUTCMonth() &&
    now.getUTCDate() === date.getUTCDate()
  );
};
