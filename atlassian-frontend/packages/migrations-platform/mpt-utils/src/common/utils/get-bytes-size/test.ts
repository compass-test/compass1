import getBytesSize from './index';

const KB = 1024;
const MB = 1024 ** 2;
const GB = 1024 ** 3;
const TB = 1024 ** 4;

describe('getBytesSize()', () => {
  describe('should display size without fraction', () => {
    // given
    const testCases: [number, string][] = [
      [0, '0 KB'],
      [4, '0 KB'],
      [1023, '1 KB'],
      [1024, '1 KB'],
      [2.42 * KB, '2 KB'],
      [2.5 * KB, '3 KB'],
      [2.512 * KB, '3 KB'],
      [1 * MB, '1 MB'],
      [1.42 * MB, '1 MB'],
      [1.75 * MB, '2 MB'],
      [1 * GB, '1 GB'],
      [1.3 * GB, '1 GB'],
      [1.5 * GB, '2 GB'],
      [1.51 * GB, '2 GB'],
      [1 * TB, '1 TB'],
      [1024 ** 5, '1 PB'],
      [1024 ** 6, '1 EB'],
      [1024 ** 7, '1 ZB'],
      [1024 ** 8, '1 YB'],
      [1024 ** 9, '1024 YB'],
    ];

    testCases.forEach(([size, expectedMsg]) => {
      it(`display "${expectedMsg}" message for input ${size}`, () => {
        // then
        expect(getBytesSize(size)).toEqual(expectedMsg);
      });
    });
  });
});
