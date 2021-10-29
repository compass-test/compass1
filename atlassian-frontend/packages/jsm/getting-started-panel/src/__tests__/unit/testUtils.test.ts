import { deterministicShuffle } from '../_testUtils';

type ArrayTransformTestCase<T> = [string, (taskIds: T[]) => T[]];

describe('deterministicShuffle', () => {
  describe.each([
    [[]],
    [[1]],
    [['1']],
    [['string', 'cheese']],
    [['with spaces', 'oh so many spaces']],
    [['one', 'two', 'three', 'four', 'five']],
    [[...Array(100).keys()]],
  ] as any[][][])('test case %#', (inputArray) => {
    describe.each([
      ['as is', (x) => x],
      ['shuffled', deterministicShuffle],
      ['reversed', (x) => [...x].reverse()],
      ['sorted', (x) => [...x].sort()],
      ['reverse sorted', (x) => [...x].sort().reverse()],
    ] as ArrayTransformTestCase<any>[])('%s', (_, transformer) => {
      const transformedArray = transformer(inputArray);

      it('should contain the same elements as input', () => {
        const shuffled = deterministicShuffle(transformedArray);

        expect(shuffled).toEqual(expect.arrayContaining(transformedArray));

        expect(shuffled.length).toEqual(transformedArray.length);
      });

      it('should output the same array on subsequent calls', () => {
        const shuffled1 = deterministicShuffle(transformedArray);
        const shuffled2 = deterministicShuffle(transformedArray);
        const shuffled3 = deterministicShuffle(transformedArray);

        expect(shuffled2).toEqual(shuffled1);
        expect(shuffled3).toEqual(shuffled1);
      });
    });
  });
});
