import {
  CaptchaChallengeEventHandlerOptions as BaseCaptchaChallengeEventHandlerOptions,
  LoadReCaptchaOptions as BaseLoadReCaptchaOptions,
  loadEnterpriseReCaptchaScript,
  loadFreeReCaptchaScript,
  LoadReCaptchaClient,
  OnEventCallback,
  OnReCaptchaChallengeCallback,
  RequestCaptchaChallengeForElementCallback,
  SetHTMLElementFn,
  useCaptchaChallengeCallback,
  useCaptchaChallengeEventHandler,
  useRequestCaptchaChallenge,
} from '@atlassian/commerce-recaptcha-base';

import { useHAMSRequestSiteKey } from './services/hams';

export type {
  SiteKey,
  RequestCaptchaChallengeForElementOptions,
  RequestCaptchaChallengeForElementCallback,
  OnReCaptchaChallengeCallback,
  ReCaptcha,
  TokenResult,
  OnEventCallback,
} from '@atlassian/commerce-recaptcha-base';
export {
  ReCaptchaLegalText,
  RawReCaptchaLegalText,
} from '@atlassian/commerce-recaptcha-base';

export {
  isSuccessful,
  isFailure,
  isError,
  isException,
} from '@atlassian/commerce-resultful';

export { HAMSReCaptchaErrorMessage } from './ui';

export { loadEnterpriseReCaptchaScript, loadFreeReCaptchaScript };

export type { SetHTMLElementFn, LoadReCaptchaClient };

export type HAMSOptions = {
  siteKeyBaseUrl?: string;
};

export type LoadReCaptchaOptions = BaseLoadReCaptchaOptions & HAMSOptions;

/**
 * A low level alternative to {@link useCaptchaChallengeEventHandler}. The difference is that this
 * callback requires a HTML element to be passed in rather than an event.
 *
 * Note: In order to avoid introducing bugs into reCAPTCHA, please understand the various assumptions
 * required in order to handle reCAPTCHA edge cases (see reCAPTCHA documents).
 *
 * @param operation This depends on your product. See: https://hello.atlassian.net/wiki/spaces/~261604415/pages/1169536418/Hams+Captcha+Tech+Implementation+Overview
 * @param initializeOptions Customizable settings for this hook
 * @returns A result with the reCAPTCHA token inside of it
 */
export const useHAMSRequestCaptchaChallenge = (
  operation: string,
  options?: LoadReCaptchaOptions,
): RequestCaptchaChallengeForElementCallback => {
  const requestSiteKey = useHAMSRequestSiteKey(
    operation,
    options?.siteKeyBaseUrl,
  );

  return useRequestCaptchaChallenge(requestSiteKey, options);
};

/**
 * @deprecated Use {@link useHAMSRequestCaptchaChallenge} or ${@link useHAMSCaptchaChallengeEventHandler} instead.
 *
 * @param operation This depends on your product. See: https://hello.atlassian.net/wiki/spaces/~261604415/pages/1169536418/Hams+Captcha+Tech+Implementation+Overview
 * @param callback A callback that get's called after retrieving a reCAPTCHA result
 * @param initializeOptions Customizable settings for this hook
 * @returns A callback that you can pass into an event handling prop (like the onClick of a button)

 */
export const useHAMSCaptchaChallengeCallback = <
  T,
  E extends React.BaseSyntheticEvent = React.BaseSyntheticEvent
>(
  operation: string,
  onReCaptchaChallengeCallback: OnReCaptchaChallengeCallback<T, E>,
  options?: LoadReCaptchaOptions,
): OnEventCallback<T, E> => {
  const requestSiteKey = useHAMSRequestSiteKey(
    operation,
    options?.siteKeyBaseUrl,
  );

  return useCaptchaChallengeCallback(
    requestSiteKey,
    onReCaptchaChallengeCallback,
    options,
  );
};

export type CaptchaChallengeEventHandlerOptions<
  EventType extends keyof HTMLElementEventMap
> = BaseCaptchaChallengeEventHandlerOptions<EventType> & HAMSOptions;

export interface UseCaptchaChallengeEventHandlerType {
  <CallbackReturnType>(
    operation: string,
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
    operation: string,
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
 * @param operation This depends on your product. See: https://hello.atlassian.net/wiki/spaces/~261604415/pages/1169536418/Hams+Captcha+Tech+Implementation+Overview
 * @param onReCaptchaChallengeCallback A callback that get's called after retrieving a reCAPTCHA result
 * @param initializeOptions Customizable settings for this hook
 * @returns A ref callback. Pass this into the element that you want to be instrumented with reCAPTCHA.
 */
export const useHAMSCaptchaChallengeEventHandler: UseCaptchaChallengeEventHandlerType = <
  CallbackReturnType,
  EventType extends keyof HTMLElementEventMap
>(
  /**
   * This depends on your product. See: https://hello.atlassian.net/wiki/spaces/~261604415/pages/1169536418/Hams+Captcha+Tech+Implementation+Overview
   */
  operation: string,
  // TODO: Make Event generic based on event handler type
  onReCaptchaChallengeCallback: OnReCaptchaChallengeCallback<
    CallbackReturnType,
    HTMLElementEventMap[EventType]
  >,
  options: CaptchaChallengeEventHandlerOptions<EventType> = {},
): SetHTMLElementFn => {
  const requestSiteKey = useHAMSRequestSiteKey(
    operation,
    options?.siteKeyBaseUrl,
  );

  return useCaptchaChallengeEventHandler(
    requestSiteKey,
    onReCaptchaChallengeCallback,
    options,
  );
};
