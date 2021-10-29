// There is only one list of triggered promise to simplify the TriggerablePromise, this also means that
// there will be issues with running the tests without the --runInBand flag.
let triggeredPromises: (() => void)[] = [];

export class TriggerablePromise {
  static resolve<T>(value: T) {
    return new Promise((resolve) => {
      triggeredPromises.push(() => resolve(value));
    });
  }

  static reject<T>(value: T) {
    return new Promise((_, reject) => {
      triggeredPromises.push(() => reject(value));
    });
  }
}

export const clearAllPromise = () => {
  triggeredPromises = [];
};

export const triggerAllPromise = async () => {
  const MAX_DEPTH = 20;

  const recursiveCheck = async (resolve: any, iteration = 0) => {
    if (triggeredPromises.length === 0) {
      resolve();
      return;
    }

    if (iteration >= MAX_DEPTH) {
      // eslint-disable-next-line no-console
      console.error(
        "assuming we've hit an infinite loop after seeing more promises after more than",
        MAX_DEPTH,
        'iterations',
      );
      return;
    }

    const promises = [...triggeredPromises];
    clearAllPromise();
    promises.forEach((cb) => cb());

    // jest.runAllTicks() doesn't work here because it doesn't actually seem to clear the micro queue from the resolved promises, no idea why.
    await Promise.resolve();

    recursiveCheck(resolve, iteration + 1);
  };

  await new Promise((resolve) => recursiveCheck(resolve));
};
