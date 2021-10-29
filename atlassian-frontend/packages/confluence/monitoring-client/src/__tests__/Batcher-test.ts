import { Batcher } from '../Batcher';

beforeEach(() => {
  jest.useFakeTimers();
});

const betterJestFnMock = () => {
  const jestFn = jest.fn();

  const betterMock = function (this: any) {
    jestFn.apply(this, arguments);
  };

  betterMock.jestFn = jestFn;

  return betterMock;
};

it('should flush when max buffer capacity is reached', () => {
  // Arrange
  const BUFFER_CAPACITY = 10;
  const FLUSH_INTERVAL_MS = 10000;
  const onFlush = betterJestFnMock();
  const batcher = new Batcher(FLUSH_INTERVAL_MS, BUFFER_CAPACITY);
  batcher.onFlush(onFlush);
  const testEvents = Array(BUFFER_CAPACITY)
    .fill(null)
    .map((_, i) => ({ i }));

  // Act
  testEvents.forEach((e) => batcher.add(e));

  // Assert
  expect(onFlush.jestFn).toHaveBeenCalledTimes(1);
  expect(onFlush.jestFn).toHaveBeenCalledWith(testEvents);
});

it('should flush to all subscribers when max buffer capacity is reached', () => {
  // Arrange
  const BUFFER_CAPACITY = 10;
  const FLUSH_INTERVAL_MS = 10000;
  const onFlushFirst = betterJestFnMock();
  const onFlushSecond = betterJestFnMock();
  const batcher = new Batcher(FLUSH_INTERVAL_MS, BUFFER_CAPACITY);
  batcher.onFlush(onFlushFirst);
  batcher.onFlush(onFlushSecond);
  const testEvents = Array(BUFFER_CAPACITY)
    .fill(null)
    .map((_, i) => ({ i }));

  // Act
  testEvents.forEach((e) => batcher.add(e));

  // Assert
  expect(onFlushFirst.jestFn).toHaveBeenCalledWith(testEvents);
  expect(onFlushSecond.jestFn).toHaveBeenCalledWith(testEvents);
});

it('should not flush until max buffer capacity is reached', () => {
  // Arrange
  const BUFFER_CAPACITY = 10;
  const FLUSH_INTERVAL_MS = 10000;
  const onFlush = betterJestFnMock();
  const batcher = new Batcher(FLUSH_INTERVAL_MS, BUFFER_CAPACITY);
  batcher.onFlush(onFlush);
  const testEvents = Array(BUFFER_CAPACITY - 1)
    .fill(null)
    .map((_, i) => ({ i }));

  // Act
  testEvents.forEach((e) => batcher.add(e));

  // Assert
  expect(onFlush.jestFn).not.toHaveBeenCalled();
});

it('should flush at given intervals if max buffer capacity has not been reached', () => {
  // Arrange
  const BUFFER_CAPACITY = 10;
  const FLUSH_INTERVAL_MS = 10000;
  const onFlush = betterJestFnMock();
  const batcher = new Batcher(FLUSH_INTERVAL_MS, BUFFER_CAPACITY);
  batcher.onFlush(onFlush);
  const testEvents = Array(BUFFER_CAPACITY - 1)
    .fill(null)
    .map((_, i) => ({ i }));

  // Act
  testEvents.forEach((e) => batcher.add(e));
  jest.advanceTimersByTime(FLUSH_INTERVAL_MS);

  // Assert
  expect(onFlush.jestFn).toHaveBeenCalledWith(testEvents);
});

it('should flush only when the buffer is not empty', () => {
  // Arrange
  const BUFFER_CAPACITY = 10;
  const FLUSH_INTERVAL_MS = 10000;
  const onFlush = betterJestFnMock();
  const batcher = new Batcher(FLUSH_INTERVAL_MS, BUFFER_CAPACITY);
  batcher.onFlush(onFlush);

  // Act
  jest.advanceTimersByTime(FLUSH_INTERVAL_MS);

  // Assert
  expect(onFlush.jestFn).not.toHaveBeenCalled();
});

it('should not allow junk input into "onFlush"', () => {
  // Arrange
  const testInput = (input: any) => {
    const BUFFER_CAPACITY = 10;
    const FLUSH_INTERVAL_MS = 10000;

    try {
      // Act
      new Batcher(FLUSH_INTERVAL_MS, BUFFER_CAPACITY).onFlush(input);
      fail(`Expected ${input} to generate an error`);
    } catch (e) {
      // Assert
      expect(e).toBeInstanceOf(Error);
      expect(e.message).toMatch(
        /"onFlush" callback is supposed to be a function; saw (.*) instead/,
      );
    }
  };

  testInput(null);
  testInput(undefined);
  testInput(NaN);
  testInput('something');
  testInput(42);
  testInput(/hello/);
  testInput({ foo: 'bar' });
});

it('should unsubscribe listeners correctly', () => {
  // Arrange
  const BUFFER_CAPACITY = 10;
  const FLUSH_INTERVAL_MS = 10000;
  const onFlush = betterJestFnMock();
  const batcher = new Batcher(FLUSH_INTERVAL_MS, BUFFER_CAPACITY);
  const { unsubscribe } = batcher.onFlush(onFlush);
  const testEvents = Array(BUFFER_CAPACITY)
    .fill(null)
    .map((_, i) => ({ i }));
  const testEvents2 = Array(BUFFER_CAPACITY)
    .fill(null)
    .map((_, j) => ({ j }));

  // Act
  testEvents.forEach((e) => batcher.add(e));
  unsubscribe();
  testEvents2.forEach((e) => batcher.add(e));

  // Assert
  expect(onFlush.jestFn).toHaveBeenCalledTimes(1);
  expect(onFlush.jestFn).toHaveBeenCalledWith(testEvents);
});

it('should flush to all subscribers even if one of them throws', () => {
  // Arrange
  const BUFFER_CAPACITY = 10;
  const FLUSH_INTERVAL_MS = 10000;
  const onFlushSecond = betterJestFnMock();
  const batcher = new Batcher(FLUSH_INTERVAL_MS, BUFFER_CAPACITY);
  batcher.onFlush(() => {
    throw new Error('test error');
  });
  batcher.onFlush(onFlushSecond);
  const testEvents = Array(BUFFER_CAPACITY)
    .fill(null)
    .map((_, i) => ({ i }));

  // Act
  testEvents.forEach((e) => batcher.add(e));

  // Assert
  expect(onFlushSecond.jestFn).toHaveBeenCalledWith(testEvents);
});

it('should rethrow errors from flush subscribers asynchronously', () => {
  // Arrange
  const BUFFER_CAPACITY = 10;
  const FLUSH_INTERVAL_MS = 10000;
  const batcher = new Batcher(FLUSH_INTERVAL_MS, BUFFER_CAPACITY);
  const expectedError = new Error('test error');
  batcher.onFlush(() => {
    throw expectedError;
  });
  let thrownError: any;
  jest.spyOn(window, 'setTimeout').mockImplementationOnce((callback: any) => {
    try {
      callback();
    } catch (e) {
      thrownError = e;
    }
    return 0 as any;
  });
  const consoleErrorSpy = jest
    .spyOn(console, 'error')
    .mockImplementation(() => {});
  const testEvents = Array(BUFFER_CAPACITY)
    .fill(null)
    .map((_, i) => ({ i }));

  // Act
  testEvents.forEach((e) => batcher.add(e));

  // Assert
  expect(consoleErrorSpy).toHaveBeenCalledWith(
    expect.stringMatching(/callback threw the below error/),
  );
  expect(thrownError).toEqual(expectedError);
});

it('should result in no-op forceFlush when buffer is empty', () => {
  // Arrange
  const BUFFER_CAPACITY = 10;
  const FLUSH_INTERVAL_MS = 10000;
  const onFlush = betterJestFnMock();
  const batcher = new Batcher(FLUSH_INTERVAL_MS, BUFFER_CAPACITY);
  batcher.onFlush(onFlush);

  // Act
  batcher.forceFlush();

  // Assert
  expect(onFlush.jestFn).not.toHaveBeenCalled();
});

it('should invoke listeners upon forceFlush when buffer is not empty', () => {
  // Arrange
  const BUFFER_CAPACITY = 10;
  const FLUSH_INTERVAL_MS = 10000;
  const onFlush = betterJestFnMock();
  const batcher = new Batcher(FLUSH_INTERVAL_MS, BUFFER_CAPACITY);
  const testEvents = Array(BUFFER_CAPACITY - 1)
    .fill(null)
    .map((_, i) => ({ i }));
  batcher.onFlush(onFlush);

  // Act
  testEvents.forEach((e) => batcher.add(e));
  expect(onFlush.jestFn).not.toHaveBeenCalled();
  batcher.forceFlush();

  // Assert
  expect(onFlush.jestFn).toHaveBeenCalledWith(testEvents);
});
