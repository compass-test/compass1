/* eslint-disable no-undef */

import { triggerAllPromise } from './triggerable-promise';

export const waitFor = (timeout: number) =>
  new Promise<void>((resolve) => setTimeout(() => resolve(), timeout));

/**
 * Attempt to wait for all events to resolve, this is used to ensure that all debounced and delayed events
 * are fired before making any assertions.
 */
export const awaitAllEvents = async () => {
  // We need to do this to flush any remaining promises as they don't call the then callbacks with either jest.runAllTimers or jest.runAllTicks
  await new Promise(setImmediate);
  jest.runAllTimers();
};

export const completeSearch = async () => {
  // We need to ensure that any debounced searches are added to the promise queue
  jest.runAllTimers();
  // Wait for all existing timeouts and events to resolve
  await awaitAllEvents();
  // Trigger and complete the searches
  await triggerAllPromise();
  // Wait for all resulting timeouts and events to resolve
  await awaitAllEvents();
};

export const expectNonEmptyString = expect.stringMatching(/.+/);
