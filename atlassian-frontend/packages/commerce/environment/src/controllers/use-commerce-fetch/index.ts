import { useCallback } from 'react';

import { sanitizeUrlString } from '@atlassian/commerce-privacy/url';
import { HttpResponseError } from '@atlassian/commerce-service-hook';
import {
  CaptureExceptionPayload,
  EventListenerCallback,
  useSentryExceptionDispatch,
} from '@atlassian/commerce-telemetry/dispatch-hooks';

import { useCommerceOverride } from '../use-commerce-override';

export const useCommerceFetch = () => {
  const commerceContextFetch = useCommerceOverride(fetch);
  const dispatchSentryException = useSentryExceptionDispatch();

  return useCallback(
    async (...args: Parameters<typeof commerceContextFetch>) => {
      const [fetchInput] = args;

      const sanitizedUrl = sanitizeUrlString(
        typeof fetchInput === 'string' ? fetchInput : fetchInput.url,
      );

      try {
        const response = await commerceContextFetch(...args);
        if (response.status >= 400) {
          dispatchSentryException({
            exception: new Error(
              `Status: ${response.status}\nURL: ${sanitizedUrl}`,
            ),
          });
        }
        return response;
      } catch (error) {
        // eslint-disable-next-line no-console
        console.warn(error);

        const oldErrorMessage = (() => {
          if (error instanceof Error) {
            return error.stack ?? error.toString();
          } else {
            return JSON.stringify(error);
          }
        })();

        const newErrorMessage = `An error occurred when fetching from ${sanitizedUrl}\n\n ${oldErrorMessage}`;
        const wrappedError = new Error(newErrorMessage);

        dispatchSentryException({ exception: wrappedError });
        throw error;
      }
    },
    [commerceContextFetch, dispatchSentryException],
  );
};

export const reportHttpError = <T>(
  request: Promise<T>,
  dispatchSentryException: EventListenerCallback<CaptureExceptionPayload>,
) =>
  request.catch((error) => {
    // reportHttpError doesn't dispatch url as HttpResponseError has a resource name in the message
    if (error instanceof HttpResponseError) {
      dispatchSentryException({
        exception: error,
      });
    }

    const oldErrorMessage = (() => {
      if (error instanceof Error) {
        return error.stack ?? error.toString();
      } else {
        return JSON.stringify(error);
      }
    })();

    const newErrorMessage = `An error occurred when fetching data\n\n ${oldErrorMessage}`;
    dispatchSentryException({ exception: new Error(newErrorMessage) });

    return error;
  });
