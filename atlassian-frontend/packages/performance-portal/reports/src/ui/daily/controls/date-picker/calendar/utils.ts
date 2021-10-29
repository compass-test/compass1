import addMonths from 'date-fns/addMonths';
import format from 'date-fns/format';
import parseISO from 'date-fns/parseISO';
import memoize from 'lodash/memoize';

import { isWeekend } from '../../../../../common/utils/date';

const generateAllDateStringInMonth = (yearMonth: string): string[] => {
  const thirtyOneDays = Array.from({ length: 31 }, (_, i) => i + 1);

  return thirtyOneDays.map((d) => {
    const dayStr = String(d).padStart(2, '0');
    return `${yearMonth}-${dayStr}`;
  });
};

const getYearMonthStr = (date: Date) => format(date, 'yyyy-MM');

const generateMonthStrArr = (yearMonth: string, max: Date): string[] => {
  const dateStringsInMonth = generateAllDateStringInMonth(yearMonth);
  if (yearMonth > getYearMonthStr(max)) {
    return dateStringsInMonth;
  }

  const disabledWeekendDates = dateStringsInMonth.filter((dateStr) =>
    isWeekend(parseISO(`${dateStr}T00:00:00.000Z`)),
  );

  if (yearMonth < getYearMonthStr(max)) {
    return disabledWeekendDates;
  }

  const disabledFutureDates = dateStringsInMonth.slice(max.getDate());

  return [...disabledFutureDates, ...disabledWeekendDates];
};

const memoizeGenerateMonthStrArr = memoize(generateMonthStrArr);

export const generateDisabledDateStrArr = (
  isoDateStr: string = format(new Date(), 'yyyy-MM-dd'),
  maxDateString: string = format(new Date(), 'yyyy-MM-dd'),
): string[] => {
  const date = parseISO(isoDateStr);
  const max = parseISO(maxDateString);

  return [
    ...memoizeGenerateMonthStrArr(getYearMonthStr(date), max),
    ...memoizeGenerateMonthStrArr(getYearMonthStr(addMonths(date, 1)), max),
    ...memoizeGenerateMonthStrArr(getYearMonthStr(addMonths(date, -1)), max),
  ];
};
