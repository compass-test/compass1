import { seriesToEndOfMonthMedian } from './utils';

describe('seriesToEndOfMonthMedian', () => {
  const seriesData = (date: string, value: number) => ({
    dateTime: `${date}T00:00:00.000Z`,
    value,
    count: 1,
  });

  test('calculate median of last 5 data point of each month', () => {
    const eomMedian = seriesToEndOfMonthMedian([
      seriesData('2021-01-25', 1),
      seriesData('2021-01-26', 2),
      seriesData('2021-01-27', 3),
      seriesData('2021-01-28', 4),
      seriesData('2021-01-29', 5),

      seriesData('2021-02-22', 6),
      seriesData('2021-02-23', 7),
      seriesData('2021-02-24', 8),
      seriesData('2021-02-25', 9),
      seriesData('2021-02-26', 10),
    ]);
    expect(eomMedian.length).toBe(2);
    expect(eomMedian[0].value).toBe(3);
    expect(eomMedian[1].value).toBe(8);
  });

  test('ignore values not in the last 5 data point of the month', () => {
    const eomMedian = seriesToEndOfMonthMedian([
      // excluded from median calculation:
      seriesData('2021-01-19', 10),
      seriesData('2021-01-20', 10),
      seriesData('2021-01-21', 10),
      seriesData('2021-01-22', 10),

      // included in median calculation:
      seriesData('2021-01-25', 1),
      seriesData('2021-01-26', 2),
      seriesData('2021-01-27', 3),
      seriesData('2021-01-28', 4),
      seriesData('2021-01-29', 5),
    ]);
    expect(eomMedian.length).toBe(1);
    expect(eomMedian[0].value).toBe(3);
  });

  test('when last 5 data point in a month has gap (missing days)', () => {
    const eomMedian = seriesToEndOfMonthMedian([
      seriesData('2021-03-15', 1),
      seriesData('2021-03-16', 2),
      seriesData('2021-03-24', 3),
      seriesData('2021-03-25', 4),
      seriesData('2021-03-26', 5),
    ]);
    expect(eomMedian.length).toBe(1);
    expect(eomMedian[0].value).toBe(3);
  });

  test('when month has less than 5 days data points (e.g. very low traffic experiences)', () => {
    const eomMedian = seriesToEndOfMonthMedian([
      seriesData('2021-03-24', 3),
      seriesData('2021-03-25', 4),
      seriesData('2021-03-26', 5),
    ]);
    expect(eomMedian.length).toBe(1);
    expect(eomMedian[0].value).toBe(4);
  });
});
