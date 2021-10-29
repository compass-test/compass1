import format from 'date-fns/format';
import subMonths from 'date-fns/subMonths';

export const getMonthOptions = ({ from }: { from: Date }) => {
  return [...Array(6)].map((_, index) => {
    const month = subMonths(from, index);

    return {
      label: format(month, 'MMMM'),
      value: `${month.getFullYear()}-${month.getMonth()}`,
    };
  });
};

export const parseYearMonthString = (yearMonthString: string) => {
  const values = yearMonthString.split('-');
  const year = Number(values[0]);
  const month = Number(values[1]);

  return {
    year,
    month,
  };
};
