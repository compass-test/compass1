import addDays from 'date-fns/addDays';
import format from 'date-fns/format';
import startOfWeek from 'date-fns/startOfWeek';
import subWeeks from 'date-fns/subWeeks';

const formatDateForLabel = (date: Date) => format(date, 'MMM dd');
const formatDateForMonthGroupLabel = (date: Date) => format(date, "MMMM ''yy");

export interface Option {
  label: string;
  value: string;
}
export const getWeekOptions = ({
  from,
  noOfWeeks,
}: {
  from: Date;
  noOfWeeks: number;
}) => {
  const fromStartOfWeek = startOfWeek(from, {
    weekStartsOn: 1,
  });

  const weeks = [...Array(noOfWeeks)].map((_, index) => {
    const monday = subWeeks(fromStartOfWeek, index);
    const friday = addDays(monday, 4);
    return { monday, friday };
  });

  const groups = weeks.reduce((groupMap, { monday, friday }) => {
    const monthString = formatDateForMonthGroupLabel(monday);

    const weekOptions: Option[] = groupMap.get(monthString) ?? [];
    weekOptions.push({
      label: `${formatDateForLabel(monday)} - ${formatDateForLabel(friday)}`,
      value: format(monday, 'RRRR-I'),
    });
    groupMap.set(monthString, weekOptions);
    return groupMap;
  }, new Map<string, Option[]>());

  return [...groups.entries()].map(([month, options]) => ({
    label: month,
    options,
  }));
};

export const parseYearWeekNoString = (yearWeekNoString: string) => {
  const values = yearWeekNoString.split('-');
  const year = Number(values[0]);
  const weekNo = Number(values[1]);

  return {
    year,
    weekNo,
  };
};
