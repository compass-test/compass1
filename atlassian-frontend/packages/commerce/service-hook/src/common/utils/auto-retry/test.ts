import { autoRetry } from './index';

test('auto retry should call only once if there is no need to retry', async () => {
  let numberOfCalls = 0;
  const result = await autoRetry(
    async () => {
      numberOfCalls += 1;
      return numberOfCalls;
    },
    () => false,
    0,
  );

  expect(result).toEqual(1);
});

test('auto retry should retires until get expected result', async () => {
  let numberOfCalls = 0;
  const result = await autoRetry(
    async () => {
      numberOfCalls += 1;
      return numberOfCalls;
    },
    (it) => it < 3,
    0,
    5,
  );

  expect(result).toEqual(3);
});

test('auto retry should stop when reach retry limit and return last result', async () => {
  let numberOfCalls = 0;
  const result = await autoRetry(
    async () => {
      numberOfCalls += 1;
      return numberOfCalls;
    },
    () => true,
    0,
    3,
  );

  expect(result).toEqual(4);
});
