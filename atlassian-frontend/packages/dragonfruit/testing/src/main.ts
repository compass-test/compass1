import { ReactWrapper } from 'enzyme';
import fetchMock from 'fetch-mock/cjs/client';

import { RestMock, RestResponse } from './types';

/**
 * Wait for any element(s) matching the given selector to appear when testing with Enzyme.
 * If `text` is provided, returns any element(s) containing `text`.
 * Note: This is a modified implementation of https://github.com/etiennedi/enzyme-wait
 */
export const waitForElements = (
  rootComponent: ReactWrapper,
  selector: any,
  text?: string,
  maxTime = 2000,
  interval = 10,
): Promise<ReactWrapper<unknown>> => {
  if (!selector) {
    return Promise.reject(
      new Error(`No selector specified in waitForElement.`),
    );
  }

  return new Promise((resolve, reject) => {
    let remainingTime = maxTime;

    const intervalId = setInterval(() => {
      if (remainingTime < 0) {
        clearInterval(intervalId);

        return reject(
          new Error(
            `Expected to find ${selector} within ${maxTime}ms, but it was never found.`,
          ),
        );
      }

      const targetComponent = text
        ? rootComponent
            .update()
            .find(selector)
            .findWhere((element) => element.text() === text)
        : rootComponent.update().find(selector);

      if (targetComponent.length) {
        clearInterval(intervalId);
        return resolve(targetComponent);
      }

      remainingTime = remainingTime - interval;
    }, interval);
  });
};

export const waitForAllPromises = () => {
  return new Promise(setImmediate);
};

export function fetchMockGet<R = RestResponse>(mock: RestMock<R>) {
  const { request, result, ...options } = mock;

  return fetchMock.get(request.url, result, {
    // Default overwriteRoutes to true
    overwriteRoutes: true,
    ...options,
  });
}
