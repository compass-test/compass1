import { wait } from '../wait';

jest.useFakeTimers();

const waitAndExecute = async (callback: Function, delay: number) => {
  await wait(delay);
  callback();
};

describe('wait', () => {
  it('waits for supplied time and calls', async () => {
    const callback = jest.fn();
    const waitPromise = waitAndExecute(callback, 1000);
    jest.advanceTimersByTime(1000);
    await waitPromise;
    expect(callback).toBeCalledTimes(1);
  });
});
