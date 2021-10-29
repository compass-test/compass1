import { getWeekOptions } from './utils';

describe('getWeekOptions', () => {
  test('that it generates options correctly for 1 week', () => {
    const options = getWeekOptions({
      from: new Date('2020-12-30'),
      noOfWeeks: 1,
    });

    expect(options).toHaveLength(1);
    expect(options[0].label).toBe("December '20");
    expect(options[0].options).toEqual([
      { label: 'Dec 28 - Jan 01', value: '2020-53' },
    ]);
  });

  test('that it generates options correctly', () => {
    const options = getWeekOptions({
      from: new Date('2020-12-30'),
      noOfWeeks: 4,
    });

    expect(options).toHaveLength(1);
    expect(options[0].label).toBe("December '20");
    expect(options[0].options).toEqual([
      { label: 'Dec 28 - Jan 01', value: '2020-53' },
      { label: 'Dec 21 - Dec 25', value: '2020-52' },
      { label: 'Dec 14 - Dec 18', value: '2020-51' },
      { label: 'Dec 07 - Dec 11', value: '2020-50' },
    ]);
  });

  test('that it generates options correctly for multiple months', () => {
    const options = getWeekOptions({
      from: new Date('2020-12-30'),
      noOfWeeks: 8,
    });

    expect(options).toHaveLength(2);
    expect(options[0].label).toBe("December '20");
    expect(options[0].options).toEqual([
      { label: 'Dec 28 - Jan 01', value: '2020-53' },
      { label: 'Dec 21 - Dec 25', value: '2020-52' },
      { label: 'Dec 14 - Dec 18', value: '2020-51' },
      { label: 'Dec 07 - Dec 11', value: '2020-50' },
    ]);

    expect(options[1].label).toBe("November '20");
    expect(options[1].options).toEqual([
      { label: 'Nov 30 - Dec 04', value: '2020-49' },
      { label: 'Nov 23 - Nov 27', value: '2020-48' },
      { label: 'Nov 16 - Nov 20', value: '2020-47' },
      { label: 'Nov 09 - Nov 13', value: '2020-46' },
    ]);
  });
});
