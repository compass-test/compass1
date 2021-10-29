import { getMonthOptions, parseYearMonthString } from './utils';

describe('getMonthOptions', () => {
  test('that it generates last six months of options starting from the provided date', () => {
    const december2020 = new Date(2020, 11);
    const options = getMonthOptions({ from: december2020 });

    expect(options.length).toEqual(6);
    expect(options).toEqual([
      { label: 'December', value: '2020-11' },
      { label: 'November', value: '2020-10' },
      { label: 'October', value: '2020-9' },
      { label: 'September', value: '2020-8' },
      { label: 'August', value: '2020-7' },
      { label: 'July', value: '2020-6' },
    ]);
  });
});

describe('parseYearMonthString', () => {
  test('that it parses string to object correctly', () => {
    expect(parseYearMonthString('2020-11')).toEqual({ year: 2020, month: 11 });
  });
});
