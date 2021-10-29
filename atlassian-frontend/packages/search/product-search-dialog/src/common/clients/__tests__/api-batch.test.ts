import { batchMethod } from '../api-batch';

jest.mock('lodash/debounce', () => ({
  __esModule: true,
  default: jest.fn((fn) => {
    let counter = 0;

    return () => {
      counter++;
      counter >= 2 ? fn() : null;
    };
  }),
}));

describe('batchMethod', () => {
  let argumentResolver: any;
  let finalFn: any;
  let successfulResponseMapper: any;

  beforeEach(() => {
    argumentResolver = jest.fn();
    finalFn = jest
      .fn()
      .mockImplementation(() =>
        Promise.resolve({ testId: 'success', testId2: 'testId2Success' }),
      );
    successfulResponseMapper = jest.fn((response, id) => response[id]);
  });

  it('should have a debounce mechanism resolve for success', () => {
    expect.assertions(3);
    const debouncedMethod = batchMethod(
      argumentResolver,
      finalFn,
      successfulResponseMapper,
    );
    const promise = debouncedMethod('testId', 'testArg');
    const promise2 = debouncedMethod('testId2', 'testArg2');

    return Promise.all([promise, promise2]).then((values) => {
      expect(values[0]).toBe('success');
      expect(values[1]).toBe('testId2Success');
      expect(argumentResolver).toBeCalledWith(['testArg', 'testArg2']);
    });
  });

  it('should reject for failure', async () => {
    finalFn = jest.fn(() => Promise.reject());
    expect.assertions(2);
    const debouncedMethod = batchMethod(
      argumentResolver,
      finalFn,
      successfulResponseMapper,
    );
    const promise1 = debouncedMethod('testId', 'testArg');
    const promise2 = debouncedMethod('testId2', 'testArg2');

    await expect(promise1).rejects.toEqual(undefined);
    await expect(promise2).rejects.toEqual(undefined);
  });
});
