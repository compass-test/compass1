import CancellablePromise from '../cancellable-promise';

describe('CancellablePromise', () => {
  const RESOLVED = 'resolution';
  const REJECTED = 'failure';

  it('returns a resolved promise on natural resolution', async () => {
    const promise = Promise.resolve(RESOLVED);
    const cancellablePromise = CancellablePromise.from(promise);

    await expect(cancellablePromise.promise()).resolves.toEqual(RESOLVED);
  });

  it('returns a rejected promise on natural rejection', async () => {
    const promise = Promise.reject(REJECTED);
    const cancellablePromise = CancellablePromise.from(promise);

    await expect(cancellablePromise.promise()).rejects.toEqual(REJECTED);

    cancellablePromise
      .promise()
      .catch((e) => expect(e.isCancelled).toBeFalsy());
  });

  it('returns a rejected promise on cancellation', async () => {
    const promise = new Promise(() => {});
    const cancellablePromise = CancellablePromise.from(promise);

    cancellablePromise.cancel();

    await expect(cancellablePromise.promise()).rejects.toBeTruthy();

    cancellablePromise.promise().catch((e) => expect(e.isCancelled).toBe(true));
  });
});
