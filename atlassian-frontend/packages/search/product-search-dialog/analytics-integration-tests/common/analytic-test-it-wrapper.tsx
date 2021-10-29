/* eslint-disable no-undef */
import { cleanup } from '@testing-library/react';
import { clearAllPromise } from './triggerable-promise';

export const beforeAndAfterTestSetup = () => {
  beforeAll(() => {
    jest.spyOn(console, 'warn').mockImplementation(() => {});
  });

  afterAll(() => {
    // Restore logger
    // eslint-disable-next-line no-console
    (console.warn as any).mockRestore();
  });

  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(async () => {
    // Clear all timers where possible
    jest.clearAllTimers();

    // Unmount components
    cleanup();

    // Clear all timers where possible that may have been spawned by the unmount
    jest.clearAllTimers();

    // Clear all remaining promises
    clearAllPromise();

    // Restore timers
    jest.useRealTimers();
  });
};

/**
 * A wrapper around that provides some boilerplate setup for the analytic tests
 */
export const analyticTest = (
  testName: string,
  testFunction: () => Promise<any>,
) => {
  it(testName, async () => {
    expect.hasAssertions();
    await testFunction();
  });
};
