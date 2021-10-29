import addMonths from 'date-fns/addMonths';

const monthYear = new Intl.DateTimeFormat([], {
  month: '2-digit',
  year: 'numeric',
});

const getStrippedDate = (date: Date) => {
  const year = date.getUTCFullYear();
  const month = date.getUTCMonth();
  return new Date(Date.UTC(year, month));
};

/**
 * Generates data for a line chart from a set of dates.
 * From the earliest month, to the latest, it shows how many
 * of the given dates occurred before/during each month.
 * @param dates
 * @param options
 * @returns
 */
export const generateData = (dates: string[]) => {
  const sorted = [...dates]
    .map((dateString) => new Date(dateString))
    .sort((a, b) => a.getTime() - b.getTime());
  const last = sorted[sorted.length - 1];

  const data = [];

  let current = getStrippedDate(sorted[0]);
  while (current <= last) {
    data.push({
      month: monthYear.format(current),
      count: sorted.filter((x) => x <= current).length,
    });
    current = addMonths(current, 1);
  }

  data.push({
    month: monthYear.format(current),
    count: sorted.length,
  });

  return data;
};
