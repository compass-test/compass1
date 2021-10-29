import { useCallback, useEffect, useRef, useState } from 'react';

import {
  createErrorResult,
  createSuccessResult,
  isException,
  isSuccessful,
} from '@atlassian/commerce-resultful';
import { ProbabilityOfBug } from '@atlassian/commerce-telemetry';

import { useTaskTracker } from './common/utils/events';
import { useCallbackPromiseQueue } from './controllers/use-callback-promise-queue';
import {
  LoadReCaptchaOptions,
  ReCaptcha,
  ReCaptchaClient,
  RequestCaptchaChallengeForElementClientCallback,
  RequestCaptchaChallengeForElementOptions,
  SiteKey,
  TokenResult,
  useReCaptchaService,
} from './services/recaptcha';
import {
  FetchServerSideSiteKey,
  ServerSideSiteKey,
  ServerSideSiteKeyPayload,
  shouldSkipReCaptchaChallenge,
  useSiteKeyService,
} from './services/site-key';

export { FAILED_SITE_KEY_RETRIEVAL } from './services/site-key';

export {
  loadEnterpriseReCaptchaScript,
  loadFreeReCaptchaScript,
} from './services/recaptcha';
export type {
  LoadReCaptchaOptions,
  LoadReCaptchaClient,
} from './services/recaptcha';

export {
  isSuccessful,
  isFailure,
  isException,
  isError,
} from '@atlassian/commerce-resultful';

export {
  ReCaptchaErrorMessage,
  ReCaptchaLegalText,
  RawReCaptchaLegalText,
} from './ui';

export { ReCaptchaStateProvider } from './controllers/recaptcha-state-provider';

export type {
  SiteKey,
  ServerSideSiteKey,
  ServerSideSiteKeyPayload,
  RequestCaptchaChallengeForElementClientCallback,
  RequestCaptchaChallengeForElementOptions,
  FetchServerSideSiteKey,
  ReCaptchaClient,
  ReCaptcha,
  TokenResult,
};

export type RequestCaptchaChallengeForElementCallback = (
  element: HTMLElement,
  parameters?: RequestCaptchaChallengeForElementOptions,
) => Promise<TokenResult>;

/**
 * A low level alternative to {@link useCaptchaChallengeEventHandler}. The difference is that this
 * callback requires a HTML element to be passed in rather than an event.
 *
 * Note: In order to avoid introducing bugs into reCAPTCHA, please understand the various assumptions
 * required in order to handle reCAPTCHA edge cases (see reCAPTCHA documents).
 *
 * @param fetchSiteKeyProgress Will be called when this hook needs to retrieve a reCAPTCHA site key.
 * @param initializeOptions Customizable settings for this hook
 * @returns A result with the reCAPTCHA token inside of it
 */
export const useRequestCaptchaChallenge = (
  fetchSiteKeyProgress: FetchServerSideSiteKey,
  loadReCaptchaOptions?: LoadReCaptchaOptions,
) => {
  const siteKeyService = useSiteKeyService(fetchSiteKeyProgress);
  const reCaptchaService = useReCaptchaService(loadReCaptchaOptions);
  const startTask = useTaskTracker({
    action: 'submit',
    actionSubject: 'reCaptcha',
  });

  const requestCaptchaChallenge: RequestCaptchaChallengeForElementCallback = useCallbackPromiseQueue(
    useCallback(
      (element, challengeOptions) => {
        if (siteKeyService.loading) {
          return;
        }

        if (siteKeyService.value.failed) {
          return {
            resolveWith: Promise.resolve(
              createErrorResult(siteKeyService.value),
            ),
          };
        }

        if (shouldSkipReCaptchaChallenge(siteKeyService.value.siteKey)) {
          return {
            resolveWith: Promise.resolve(createSuccessResult(null)),
          };
        }

        if (reCaptchaService.loading) {
          return;
        }

        const resultPromise = reCaptchaService.value.requestCaptchaChallengeForElement(
          element,
          siteKeyService.value.siteKey,
          challengeOptions,
        );

        return { resolveWith: resultPromise };
      },
      [reCaptchaService, siteKeyService],
    ),
  );

  const trackedRequestCaptchaChallenge: RequestCaptchaChallengeForElementCallback = useCallback(
    async (element, options) => {
      const taskResult = await startTask(async () => {
        const payload = await requestCaptchaChallenge(element, options);

        if (isSuccessful(payload)) {
          return {
            succeed: {
              payload,
            },
          };
        } else {
          const failureInfo = isException(payload)
            ? ({
                probabilityOfBug: ProbabilityOfBug.GUARANTEED,
                loggablePayload: payload.exception,
              } as const)
            : {};

          return {
            fail: {
              payload,
              ...failureInfo,
            },
          };
        }
      });

      // unwrap - the payload is already a result
      if (taskResult.fail !== undefined) {
        return taskResult.fail.payload;
      } else {
        return taskResult.succeed.payload;
      }
    },
    [requestCaptchaChallenge, startTask],
  );

  return trackedRequestCaptchaChallenge;
};

export type OnEventCallback<
  T,
  E extends React.BaseSyntheticEvent = React.BaseSyntheticEvent
> = (event: E) => Promise<T>;

export type OnReCaptchaChallengeCallback<T, E = React.BaseSyntheticEvent> = (
  token: TokenResult,
  event: E,
) => T;

/**
 * @deprecated Use {@link useCaptchaChallengeEventHandler} or ${@link useRequestCaptchaChallenge} instead.
 *
 * @param fetchSiteKeyProgress Will be called when this hook needs to retrieve a reCAPTCHA site key.
 * @param onReCaptchaChallengeCallback A callback that get's called after retrieving a reCAPTCHA result
 * @param initializeOptions Customizable settings for this hook
 * @returns A callback that you can pass into an event handling prop (like the onClick of a button)
 */
export const useCaptchaChallengeCallback = <
  T,
  E extends React.BaseSyntheticEvent = React.BaseSyntheticEvent
>(
  fetchSiteKeyProgress: FetchServerSideSiteKey,
  onReCaptchaChallengeCallback: OnReCaptchaChallengeCallback<T, E>,
  loadReCaptchaOptions?: LoadReCaptchaOptions,
): OnEventCallback<T, E> => {
  const challenge = useRequestCaptchaChallenge(
    fetchSiteKeyProgress,
    loadReCaptchaOptions,
  );
  const callbackWithChallenge = useCallback(
    async (event: E) => {
      const token = await challenge(event.target);

      return await onReCaptchaChallengeCallback(token, event);
    },
    [challenge, onReCaptchaChallengeCallback],
  );

  return callbackWithChallenge;
};

export type CaptchaChallengeEventHandlerOptions<
  EventType extends keyof HTMLElementEventMap
> = {
  /**
   * reCAPTCHA will trigger based on the string you pass in here.
   * @see https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener
   */
  eventType?: EventType;
} & LoadReCaptchaOptions;

export type SetHTMLElementFn = (element: HTMLElement | null) => void;

export interface UseCaptchaChallengeEventHandlerType {
  <CallbackReturnType>(
    fetchSiteKeyProgress: FetchServerSideSiteKey,
    onReCaptchaTokenResult: OnReCaptchaChallengeCallback<
      CallbackReturnType,
      HTMLElementEventMap['click']
    >,
    optionsWithEventType?: Omit<
      CaptchaChallengeEventHandlerOptions<'click'>,
      'eventType'
    >,
  ): SetHTMLElementFn;
  <CallbackReturnType, EventType extends keyof HTMLElementEventMap>(
    fetchSiteKeyProgress: FetchServerSideSiteKey,
    onReCaptchaTokenResult: OnReCaptchaChallengeCallback<
      CallbackReturnType,
      HTMLElementEventMap[EventType]
    >,
    options: CaptchaChallengeEventHandlerOptions<EventType>,
  ): SetHTMLElementFn;
}

/**
 * A ref callback hook that instruments element(s) with reCAPTCHA.
 *
 * @param element The element you want to show a CAPTCHA challenge next to (if you have a modal available)
 * @param onReCaptchaTokenResult A callback that get's called after retrieving a reCAPTCHA result
 * @param initializeOptions Customizable settings for this hook
 * @returns A ref callback. Pass this into the element that you want to be instrumented with reCAPTCHA.
 */
export const useCaptchaChallengeEventHandler: UseCaptchaChallengeEventHandlerType = <
  CallbackReturnType,
  EventType extends keyof HTMLElementEventMap
>(
  fetchSiteKeyProgress: FetchServerSideSiteKey,
  onReCaptchaChallengeCallback: OnReCaptchaChallengeCallback<
    CallbackReturnType,
    HTMLElementEventMap[EventType]
  >,
  {
    eventType = 'click' as EventType,
    ...options
  }: CaptchaChallengeEventHandlerOptions<EventType> = {},
): SetHTMLElementFn => {
  const [reCaptchaElement, setReCaptchaElement] = useState<HTMLElement | null>(
    null,
  );
  const alreadyRunningReCaptchaState = useRef(false);

  const challenge = useRequestCaptchaChallenge(fetchSiteKeyProgress, options);

  useEffect(() => {
    if (reCaptchaElement === null) {
      return;
    }

    // TODO: Give event a more specific type depending on the event type string
    const eventListener = async (event: HTMLElementEventMap[EventType]) => {
      if (alreadyRunningReCaptchaState.current) {
        /*
          Run reCAPTCHA but let the previously running reCAPTCHA actually handle the completed challenge
          (completing the reCAPTCHA for 1 callback resolves the promises for all currently resolving CAPTCHA challenges).

          Note that we have no idea whether the reCAPTCHA challenge has been dismissed which is why we have to
          call challenge every single time the user triggers the event.
        */
        await challenge(reCaptchaElement);
        return;
      }

      alreadyRunningReCaptchaState.current = true;
      const result = await challenge(reCaptchaElement);
      alreadyRunningReCaptchaState.current = false;

      await onReCaptchaChallengeCallback(result, event);
    };

    reCaptchaElement.addEventListener(eventType, eventListener);

    return () => {
      reCaptchaElement.removeEventListener(eventType, eventListener);
    };
  }, [reCaptchaElement, challenge, onReCaptchaChallengeCallback, eventType]);

  return setReCaptchaElement;
};
