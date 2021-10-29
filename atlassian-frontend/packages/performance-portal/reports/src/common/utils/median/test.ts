import { median } from './index';

describe('median', () => {
  test('calculate median correctly', () => {
    expect(median([1, 2, 3])).toEqual(2);
    expect(median([1, 2, 3, 4, 5])).toEqual(3);
    expect(median([1, 2, 3, 4])).toEqual(2.5);
  });
});
