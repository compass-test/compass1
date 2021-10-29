import Ready, {
  DEFAULT_PROMISE_TIMEOUT,
  READY_CACHE,
  READY_FETCH,
} from '../Ready';

describe('Core - Ready', () => {
  let ready: Ready;

  beforeEach(() => {
    jest.useFakeTimers();
    ready = new Ready();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  test('promise only resolves when calling triggerReady', () => {
    expect.hasAssertions();
    const callback = jest.fn();
    const promise = ready.getPromise().then(callback);

    return Promise.resolve()
      .then(() => {
        expect(callback).not.toHaveBeenCalled();

        ready.triggerReady(READY_CACHE);
        return promise;
      })
      .then(() => {
        expect(callback).toHaveBeenCalledTimes(1);
        expect(callback).toHaveBeenCalledWith(READY_CACHE);
      });
  });

  test('reset doesnt recreate promise if promise is still pending', () => {
    expect.hasAssertions();
    const callback = jest.fn();
    const promise = ready.getPromise().then(callback);
    ready.reset();
    ready.triggerReady(READY_CACHE);
    return promise.then(() => {
      expect(callback).toHaveBeenCalledTimes(1);
      expect(callback).toHaveBeenCalledWith(READY_CACHE);
    });
  });

  test('reset should create new promise if promise has been resolved', () => {
    expect.hasAssertions();
    const callback = jest.fn();
    const promise1 = ready.getPromise().then(callback);
    ready.triggerReady(READY_CACHE);
    ready.reset();
    const promise2 = ready.getPromise().then(callback);

    return promise1
      .then(() => {
        expect(callback).toHaveBeenCalledTimes(1);
        ready.triggerReady(READY_CACHE);
        return promise2;
      })
      .then(() => {
        expect(callback).toHaveBeenCalledTimes(2);
        expect(callback).toHaveBeenCalledWith(READY_CACHE);
      });
  });

  test('promise should not resolve if already resolved', () => {
    expect.assertions(2);

    const successCallback = jest.fn();
    const promise = ready.getPromise().then(successCallback);

    return Promise.resolve()
      .then(() => {
        ready.triggerReady(READY_CACHE);
        ready.triggerReady(READY_FETCH);
        return promise;
      })
      .finally(() => {
        expect(successCallback).toHaveBeenCalledTimes(1);
        expect(successCallback).toHaveBeenCalledWith(READY_CACHE);
      });
  });

  test('promise race should return the default promise', () => {
    expect.assertions(4);

    const successCallback = jest.fn();
    const promise = ready.getPromise().then(successCallback);

    return Promise.resolve()
      .then(() => {
        expect(successCallback).not.toHaveBeenCalled();
        jest.runOnlyPendingTimers();
        return promise;
      })
      .finally(() => {
        expect(successCallback).toHaveBeenCalledTimes(1);
        expect(setTimeout).toHaveBeenCalledTimes(1);
        expect(setTimeout).toHaveBeenLastCalledWith(
          expect.any(Function),
          DEFAULT_PROMISE_TIMEOUT,
        );
      });
  });

  test('reset should call initialiseDefaultPromise', () => {
    const spy = jest.spyOn(Ready.prototype as any, 'initialiseDefaultPromise');
    ready.reset();
    expect(spy).toHaveBeenCalledTimes(1);
  });
});

describe('Ready with configured timeout', () => {
  let ready: Ready;

  beforeEach(() => {
    jest.useFakeTimers();
    ready = new Ready({ readyTimeoutInMilliseconds: 4000 });
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  test('promise race should return the default promise in a custom timeout', () => {
    expect.assertions(4);
    const successCallback = jest.fn();
    const promise = ready.getPromise().then(successCallback);

    return Promise.resolve()
      .then(() => {
        expect(successCallback).not.toHaveBeenCalled();
        jest.runOnlyPendingTimers();
        return promise;
      })
      .finally(() => {
        expect(successCallback).toHaveBeenCalledTimes(1);
        expect(setTimeout).toHaveBeenCalledTimes(1);
        expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), 4000);
      });
  });
});
