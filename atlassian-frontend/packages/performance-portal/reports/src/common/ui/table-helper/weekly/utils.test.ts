import { seriesToWeeklyMedian } from './utils';

describe('seriesToWeeklyMedian', () => {
  const seriesData = (date: string, value: number) => ({
    dateTime: `${date}T00:00:00.000Z`,
    value,
    count: 1,
  });
  test('calculate correctly', () => {
    const weeklyMedian = seriesToWeeklyMedian([
      // week 1
      seriesData('2021-01-04', 1),
      seriesData('2021-01-05', 2),
      seriesData('2021-01-06', 3),
      seriesData('2021-01-07', 4),
      seriesData('2021-01-08', 5),

      // week 2
      seriesData('2021-01-11', 6),
      seriesData('2021-01-12', 7),
      seriesData('2021-01-13', 8),
      seriesData('2021-01-14', 9),
      seriesData('2021-01-15', 10),
    ]);

    expect(weeklyMedian.length).toEqual(2);
    expect(weeklyMedian[0].value).toEqual(3);
    expect(weeklyMedian[1].value).toEqual(8);
  });

  test('incomplete past week', () => {
    const weeklyMedian = seriesToWeeklyMedian([
      // week 1 - incomplete week, e.g. data missing / transform error / no traffic for the day
      seriesData('2021-01-04', 1),
      seriesData('2021-01-05', 2),
      seriesData('2021-01-06', 3),

      // week 2
      seriesData('2021-01-11', 6),
      seriesData('2021-01-12', 7),
      seriesData('2021-01-13', 8),
      seriesData('2021-01-14', 9),
      seriesData('2021-01-15', 10),
    ]);

    expect(weeklyMedian.length).toEqual(2);
    expect(weeklyMedian[0].value).toEqual(2);
    expect(weeklyMedian[1].value).toEqual(8);
  });
});
