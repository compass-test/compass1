const getDateStrForPreviousMonth = (month: number, year: number): string[] => {
  month = month - 1;
  const thirtyOneDays = Array.from({ length: 31 }, (_, i) => i + 1);
  let monthStr: string, yearStr: string;
  if (month < 0) {
    month = 11;
    year = year - 1;
  }
  monthStr = String(month + 1).padStart(2, '0');
  yearStr = String(year);

  return thirtyOneDays.map((d) => {
    const dayStr = String(d).padStart(2, '0');
    return `${yearStr}-${monthStr}-${dayStr}`;
  });
};

const getDateStrForNextMonth = (month: number, year: number): string[] => {
  month = month + 1;
  const thirtyOneDays = Array.from({ length: 31 }, (_, i) => i + 1);
  let monthStr: string, yearStr: string;
  if (month > 11) {
    month = 0;
    year = year + 1;
  }
  monthStr = String(month + 1).padStart(2, '0');
  yearStr = String(year);

  return thirtyOneDays.map((d) => {
    const dayStr = String(d).padStart(2, '0');
    return `${yearStr}-${monthStr}-${dayStr}`;
  });
};

const getDateStrForCurrentMonth = (month: number, year: number): string[] => {
  const thirtyOneDays = Array.from({ length: 31 }, (_, i) => i + 1);
  const monthStr = String(month + 1).padStart(2, '0');
  const yearStr = String(year);

  return thirtyOneDays.map((d) => {
    const dayStr = String(d).padStart(2, '0');
    return `${yearStr}-${monthStr}-${dayStr}`;
  });
};

export const generateDisabledDateStrArr = (isoDateStr?: string): string[] => {
  const parsedDateStr = Date.parse(isoDateStr || '');
  const date = Number.isNaN(parsedDateStr)
    ? new Date()
    : new Date(parsedDateStr);
  const today = new Date();

  /* selected date < today */
  if (
    date.getFullYear() < today.getFullYear() ||
    (date.getFullYear() === today.getFullYear() &&
      date.getMonth() < today.getMonth()) ||
    (date.getFullYear() === today.getFullYear() &&
      date.getMonth() === today.getMonth() &&
      date.getDate() < today.getDate())
  ) {
    return [];
  }

  /* selected month > this month or year */
  if (
    date.getFullYear() > today.getFullYear() ||
    (date.getFullYear() === today.getFullYear() &&
      date.getMonth() > today.getMonth())
  ) {
    const dateStrForPreviousMonth = getDateStrForPreviousMonth(
      date.getMonth(),
      date.getFullYear(),
    );

    const dateStrForCurrentMonth = getDateStrForCurrentMonth(
      date.getMonth(),
      date.getFullYear(),
    );

    const dateStrForNextMonth = getDateStrForNextMonth(
      date.getMonth(),
      date.getFullYear(),
    );

    return [
      ...dateStrForPreviousMonth,
      ...dateStrForCurrentMonth,
      ...dateStrForNextMonth,
    ];
  }

  /* selected date is in this month */
  const dateStrForCurrentMonth = getDateStrForCurrentMonth(
    date.getMonth(),
    date.getFullYear(),
  );

  const restOfCurrentMonth = dateStrForCurrentMonth.slice(today.getDate());

  const dateStrForNextMonth = getDateStrForNextMonth(
    date.getMonth(),
    date.getFullYear(),
  );

  return [...restOfCurrentMonth, ...dateStrForNextMonth];
};
