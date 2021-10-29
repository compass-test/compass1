const flushPromises = () => new Promise(setImmediate);

import { retryOnException } from '../../retry-operation';

describe('retryOnException util', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  it('should resolve on first try if 3 intervals are supplied and the 1st call succeeds', async (done) => {
    const mockAsyncFn = jest.fn().mockImplementation(
      () =>
        new Promise((resolve, reject) => {
          resolve();
        }),
    );
    retryOnException(() => mockAsyncFn(), {
      intervalsMS: [1000, 2000, 3000],
    }).then(() => {
      expect(mockAsyncFn).toHaveBeenCalledTimes(1);
      done();
    });
    await flushPromises();
  });

  it('should resolve on second try if 3 intervals are supplied and the 2nd call succeeds', async (done) => {
    let timesTried = 0;
    const mockAsyncFn = jest.fn().mockImplementation(
      () =>
        new Promise((resolve, reject) => {
          timesTried += 1;
          if (timesTried < 2) {
            return reject(new Error('Mock error'));
          }
          resolve();
        }),
    );
    retryOnException(() => mockAsyncFn(), {
      intervalsMS: [1000, 2000, 3000],
    }).then(() => {
      expect(mockAsyncFn).toHaveBeenCalledTimes(2);
      expect(timesTried).toBe(2);
      done();
    });
    await flushPromises();
    jest.advanceTimersByTime(1000);
    await flushPromises();
  });

  it('should resolve after retrying 4 times if 3 intervals are supplied and the 4th call succeeds', async (done) => {
    let timesTried = 0;
    const mockAsyncFn = jest.fn().mockImplementation(
      () =>
        new Promise((resolve, reject) => {
          timesTried += 1;
          if (timesTried < 4) {
            return reject(new Error('Mock error'));
          }
          resolve();
        }),
    );
    retryOnException(() => mockAsyncFn(), {
      intervalsMS: [1000, 2000, 3000],
    }).then(() => {
      expect(mockAsyncFn).toHaveBeenCalledTimes(4);
      expect(timesTried).toBe(4);
      done();
    });
    expect(mockAsyncFn).toHaveBeenCalledTimes(1);
    await flushPromises();
    jest.advanceTimersByTime(1000);
    await flushPromises();
    expect(mockAsyncFn).toHaveBeenCalledTimes(2);
    jest.advanceTimersByTime(2000);
    await flushPromises();
    expect(mockAsyncFn).toHaveBeenCalledTimes(3);
    jest.advanceTimersByTime(3000);
    await flushPromises();
  });

  it('should reject the Promise after retrying 4 times if 3 intervals are supplied and the 4th call fails', async (done) => {
    let timesTried = 0;
    const mockAsyncFn = jest.fn().mockImplementation(
      () =>
        new Promise((_, reject) => {
          timesTried += 1;
          return reject(new Error('Mock error'));
        }),
    );
    retryOnException(() => mockAsyncFn(), {
      intervalsMS: [1000, 2000, 3000],
    }).catch(() => {
      expect(mockAsyncFn).toHaveBeenCalledTimes(4);
      expect(timesTried).toBe(4);
      done();
    });
    expect(mockAsyncFn).toHaveBeenCalledTimes(1);
    await flushPromises();
    jest.advanceTimersByTime(1000);
    await flushPromises();
    expect(mockAsyncFn).toHaveBeenCalledTimes(2);
    jest.advanceTimersByTime(2000);
    await flushPromises();
    expect(mockAsyncFn).toHaveBeenCalledTimes(3);
    jest.advanceTimersByTime(3000);
    await flushPromises();
  });
});
